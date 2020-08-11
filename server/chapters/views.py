from django.http import Http404
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from charts.views import ChartSerializer
from quizes.views import QuizSerializer

from .models import Chapter
from .models import Page

class PageSerializer(serializers.ModelSerializer):
    chart = ChartSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)

    class Meta:
        model = Page
        fields = ('id', 'title', 'published', 'content', 'chart', 'quiz')

class ChapterSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ('id', 'title', 'published', 'pages')

class ListContent(APIView):

    def get(self, request):
        chapters = Chapter.objects.all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                status = status.HTTP_401_UNAUTHORIZED
            )
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            chapter = serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors,
                status = status.HTTP_400_BAD_REQUEST
            )

class ChapterDetailsView(APIView):

    def get_chapter(self, chapter_id):
        try:
            chapter = Chapter.objects.get(id=chapter_id)
            return chapter
        except Chapter.DoesNotExist:
            raise Http404

    def get(self, request, chapter_id):
        chapter = self.get_chapter(chapter_id)
        serializer = ChapterSerializer(chapter)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, chapter_id):
        chapter = self.get_chapter(chapter_id)
        serializer = ChapterSerializer(data = request.data)
        if serializer.is_valid():
            chapter.title = serializer.validated_data['title']
            chapter.published = serializer.validated_data['published']
            chapter.save()
            serializer = ChapterSerializer(chapter)
            return Response(serializer.data)
        return self.get(request, chapter_id)

    def delete(self, request, chapter_id):
        chapter = self.get_chapter(chapter_id)
        chapter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ChapterPagesView(ChapterDetailsView):

    def get(self, request, chapter_id):
        chapter = self.get_chapter(chapter_id)
        pages = []
        for page in chapter.pages:
            pages.append({
                'id': page.id,
                'title': page.title,
                'published': page.published
            })
        return Response(pages, status=status.HTTP_200_OK)
    
    def post(self, request, chapter_id):
        chapter = self.get_chapter(chapter_id)
        if not isinstance(request.data, list):
            return Response('Request must be list', status=status.HTTP_400_BAD_REQUEST)
        pages = chapter.pages
        page_order_by_id = {}
        for _index, _page in enumerate(request.data):
            if 'id' in _page:
                _id = str(_page['id'])
                page_order_by_id[_id] = _index + 1
        if len(pages) != len(page_order_by_id.keys()):
            return Response('Incorrect number of pages', status=status.HTTP_400_BAD_REQUEST)
        for page in pages:
            page_id = str(page.id)
            if page_id in page_order_by_id:
                page.order = page_order_by_id[page_id]
                page.save()
        return self.get(request, chapter_id)

class PageListView(APIView):

    def get(self, request):
        pages = Page.objects.all()
        serialized = PageSerializer(pages, many=True)
        return Response(serialized.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                status = status.HTTP_401_UNAUTHORIZED
            )
        if 'chapterId' in request.data:
            try:
                chapter = Chapter.objects.get(id = request.data['chapterId'])
            except Chapter.DoesNotExist:
                return Response('Chapter does not exist', status=status.HTTP_400_BAD_REQUEST)
        else:
             return Response('chapterId not specified', status=status.HTTP_400_BAD_REQUEST)
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            page = serializer.save(
                chapter = chapter
            )
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors,
                status = status.HTTP_400_BAD_REQUEST
            )

class PageDetailsView(APIView):

    def get_page(self, page_id):
        try:
            return Page.objects.get(id=page_id)
        except Page.DoesNotExist:
            raise Http404

    def get(self, request, page_id):
        page = self.get_page(page_id)
        serialized = PageSerializer(page)
        return Response(
            serialized.data
        )

    def post(self, request, page_id):
        page = self.get_page(page_id)
        serialized = PageSerializer(data=request.data)
        if serialized.is_valid():
            page.title = serialized.validated_data['title']
            page.published = serialized.validated_data['published']
            page.save()
            page_serialized = PageSerializer(page)
            return Response(page_serialized.data)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, page_id):
        page = self.get_page(page_id)
        page.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

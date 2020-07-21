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
        fields = ('id', 'title', 'content', 'chart', 'quiz')

class ChapterSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ('id', 'title', 'pages')

class ListContent(APIView):

    def get(self, request):
        chapters = Chapter.objects.filter(published=True).all()
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
            chapter.save()
            serializer = ChapterSerializer(chapter)
            return Response(serializer.data)
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

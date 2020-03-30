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
        fields = ('slug', 'title', 'content', 'chart', 'quiz')

class ChapterSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ('id', 'title', 'slug', 'pages')

class ListContent(APIView):

    def get(self, request):
        chapters = Chapter.objects.filter(published=True).all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            chapter = serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors,
                status = status.HTTP_400_BAD_REQUEST
            )

class PageListView(APIView):

    def get(self, request):
        pages = Page.objects.all()
        serialized = PageSerializer(pages, many=True)
        return Response(serialized.data)

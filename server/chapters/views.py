from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from charts.views import ChartSerializer

from .models import Chapter
from .models import Page

class PageSerializer(serializers.ModelSerializer):
    chart = ChartSerializer(read_only=True)

    class Meta:
        model = Page
        fields = ('slug', 'title', 'content', 'chart')

class ChapterSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ('slug', 'title', 'pages')

class ListContent(APIView):

    def get(self, request):
        chapters = Chapter.objects.filter(published=True).all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

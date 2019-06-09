from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Chart

class ChartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chart
        fields = ('slug', 'title')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['effects'] = [effect.key for effect in instance.effects]
        representation['medications'] = [medications.key for medications in instance.medications]
        return representation

class ListCharts(APIView):

    def get(self, request):
        charts = Chart.objects.all()
        serializer = ChartSerializer(charts, many=True)
        return Response(serializer.data)

from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = ('slug', 'title', 'description', 'points_to_pass')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['questions'] = self.serialize_questions(instance)
        return representation

    def serialize_questions(self, instance):
        questions = []
        for question in instance.questions.all():
            questions.append({
                'text': question.text,
                'options': [
                    {
                        'name': 'Yes',
                        'slug': 'yes',
                        'value': 1
                    }, {
                        'name': 'No',
                        'slug': 'no',
                        'value': 0
                    }
                ]
            })
        return questions
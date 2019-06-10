from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Effect
from .models import Medication
from .models import MedicationEffect

class EffectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Effect
        fields = ('key', 'name', 'category', 'description')

class MedicationEffectSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicationEffect
        fields = ('label', 'value', 'comparison', 'day')

class MedicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medication
        fields = ('key', 'name')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        for medicationEffect in instance.effects.all():
            key = medicationEffect.effect.key
            serializer = MedicationEffectSerializer(medicationEffect)
            representation[key] = serializer.data

        return representation

class ListAllMedications(APIView):

    def get(self, request):
        effects = Effect.objects.all()
        effects_serializer = EffectSerializer(effects, many=True)
        medications = Medication.objects.all()
        medication_serializer = MedicationSerializer(medications, many=True)
        return Response({
            'effects': effects_serializer.data,
            'medications': medication_serializer.data
        })

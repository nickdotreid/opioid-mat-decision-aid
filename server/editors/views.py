from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import Editor

class EditorAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        trim_whitespace = False
    )


class EditorLogin(APIView):

    def post(self, request, *args, **kwargs):
        serializer = EditorAuthTokenSerializer(
            data=request.data
        )
        if not serializer.is_valid():
            return Response(
                data = serializer.errors,
                status_code = status.HTTP_400_BAD_REQUEST
            )
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            
            editor = Editor.objects.get(user__email=email)
        except Editor.DoesNotExist:
            return Response(
                'Editor does not exist',
                status_code = status.HTTP_401_UNAUTHORIZED
            )
        user = authenticate(
            request=request,
            username=editor.user.username,
            password=password
        )
        if not user:
            return Response(
                'Incorrect password',
                status_code = status.HTTP_401_UNAUTHORIZED
            )
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            data = {
                'email': user.email,
                'token': token.key
            }
        )

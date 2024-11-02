from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from django.utils.http import http_date
from datetime import timedelta
from django.utils import timezone


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            response = Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'token': token.key
                }
            })

            expires = timezone.now() + timedelta(days=7)
            response.set_cookie(key='token', value=token.key,
                                httponly=True, expires=http_date(expires.timestamp()))
            return response
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

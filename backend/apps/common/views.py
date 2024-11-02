from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserRegisterSerializer, UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        user_data = {
            'id': user.id, 
            'email': user.email,  
            'username': user.username,  
            'role': user.role if hasattr(user, 'role') else None,
        }

        return Response({
            'user': user_data,
            'token': token.key
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    if request.user.is_authenticated and hasattr(request.user, 'auth_token'):
        request.user.auth_token.delete()
        logout(request)
        return Response({"detail": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Usuário não autenticado."}, status=status.HTTP_400_BAD_REQUEST)

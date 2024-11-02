from django.urls import path
from .views import UserList, UserDetail, CustomAuthToken

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('login/', CustomAuthToken.as_view(), name='login'),
]

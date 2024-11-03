import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpassword') 
    client.force_authenticate(user=user)
    return client

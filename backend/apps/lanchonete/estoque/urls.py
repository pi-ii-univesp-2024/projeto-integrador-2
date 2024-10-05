from django.urls import path
from .views import EstoqueListCreateView, EstoqueRetrieveUpdateDestroyView

urlpatterns = [
    path('', EstoqueListCreateView.as_view(), name='estoque-list-create'),
    path('<int:pk>/', EstoqueRetrieveUpdateDestroyView.as_view(), name='estoque-detail'),
]

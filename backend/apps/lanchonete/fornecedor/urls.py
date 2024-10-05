from django.urls import path
from .views import FornecedorListCreateView, FornecedorDetailView

urlpatterns = [
    path('', FornecedorListCreateView.as_view(), name='fornecedor-list-create'),
    path('<int:pk>/', FornecedorDetailView.as_view(), name='fornecedor-detail'),
]

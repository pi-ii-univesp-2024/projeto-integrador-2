from django.urls import path
from .views import ProdutoListCreateView, ProdutoDetailView

urlpatterns = [
    path('', ProdutoListCreateView.as_view(), name='produto-list'),
    path('<int:pk>/', ProdutoDetailView.as_view(), name='produto-detail'),
]

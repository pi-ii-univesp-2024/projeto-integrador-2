from django.urls import path
from .views import CategoriaProdutoListCreateView, CategoriaProdutoDetailView

urlpatterns = [
    path('', CategoriaProdutoListCreateView.as_view(), name='categoria-list-create'),
    path('<int:pk>/', CategoriaProdutoDetailView.as_view(), name='categoria-detail'),
]

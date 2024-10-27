from rest_framework import generics
from .models import CategoriaProduto
from .serializers import CategoriaProdutoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from apps.lanchonete.pagination import CustomPageNumberPagination
from .filters import CategoriaFilter
from apps.lanchonete.services import order_and_paginate_queryset



class CategoriaProdutoListCreateView(generics.ListCreateAPIView):
    queryset = CategoriaProduto.objects.all().order_by('-id')
    serializer_class = CategoriaProdutoSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoriaFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return order_and_paginate_queryset(self, queryset, request)


class CategoriaProdutoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoriaProduto.objects.all()
    serializer_class = CategoriaProdutoSerializer

from rest_framework import generics, permissions
from .models import Produto
from .serializers import ProdutoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProdutoFilter
from apps.lanchonete.pagination import CustomPageNumberPagination
from rest_framework.authentication import TokenAuthentication
from apps.lanchonete.services import order_and_paginate_queryset


class ProdutoListCreateView(generics.ListCreateAPIView):
    queryset = Produto.objects.all().order_by('-id')
    serializer_class = ProdutoSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProdutoFilter
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return order_and_paginate_queryset(self, queryset, request)


class ProdutoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

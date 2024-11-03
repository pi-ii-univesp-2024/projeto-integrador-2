from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from .models import Fornecedor
from .serializers import FornecedorSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import FornecedorFilter
from apps.lanchonete.pagination import CustomPageNumberPagination
from apps.lanchonete.services import order_and_paginate_queryset


class FornecedorListCreateView(generics.ListCreateAPIView):
    queryset = Fornecedor.objects.all().order_by('-id')
    serializer_class = FornecedorSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = FornecedorFilter
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return order_and_paginate_queryset(self, queryset, request)


class FornecedorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

from rest_framework import generics
from .models import Estoque
from .serializers import EstoqueSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EstoqueFilter
from apps.lanchonete.pagination import CustomPageNumberPagination
from apps.lanchonete.services import order_and_paginate_queryset


class EstoqueListCreateView(generics.ListCreateAPIView):
    queryset = Estoque.objects.all().order_by('-id')
    serializer_class = EstoqueSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EstoqueFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return order_and_paginate_queryset(self, queryset, request)


class EstoqueRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

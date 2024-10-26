from rest_framework import generics
from .models import Estoque
from .serializers import EstoqueSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EstoqueFilter
from apps.lanchonete.pagination import CustomPageNumberPagination
from rest_framework.response import Response


class EstoqueListCreateView(generics.ListCreateAPIView):
    queryset = Estoque.objects.all().order_by('-id')
    serializer_class = EstoqueSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EstoqueFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        ordering = request.query_params.get('ordering')
        if ordering:
            ordering_fields = ordering.split(',')
            queryset = queryset.order_by(*ordering_fields)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class EstoqueRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

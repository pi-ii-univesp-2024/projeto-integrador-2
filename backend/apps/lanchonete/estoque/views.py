from rest_framework import generics
from .models import Estoque
from .serializers import EstoqueSerializer


class EstoqueListCreateView(generics.ListCreateAPIView):
    queryset = Estoque.objects.all().order_by('-id')
    serializer_class = EstoqueSerializer


class EstoqueRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer

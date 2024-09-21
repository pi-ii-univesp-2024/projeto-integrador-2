from rest_framework import generics
from .models import CategoriaProduto
from .serializers import CategoriaProdutoSerializer

# Listar e criar categorias de produtos
class CategoriaProdutoListCreateView(generics.ListCreateAPIView):
    queryset = CategoriaProduto.objects.all()
    serializer_class = CategoriaProdutoSerializer

# Detalhar, atualizar e deletar uma categoria de produto
class CategoriaProdutoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoriaProduto.objects.all()
    serializer_class = CategoriaProdutoSerializer

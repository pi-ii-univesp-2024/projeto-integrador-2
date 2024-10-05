from django.contrib import admin
from apps.lanchonete.produto.models import Produto
from apps.lanchonete.categoria_produto.models import CategoriaProduto
from apps.lanchonete.fornecedor.models import Fornecedor
from apps.lanchonete.estoque.models import Estoque


@admin.register(CategoriaProduto)
class CategoriaProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)
    ordering = ('-id',)


@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone', 'endereco',)
    list_filter = ('nome', 'email', 'telefone', 'endereco',)
    search_fields = ('nome', 'email', 'telefone', 'endereco',)
    ordering = ('-id',)


@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'marca', 'fornecedor', 'categoria', 'unidade_medida',
                    'preco_por_unidade', 'quantidade_estoque', 'data_validade')
    list_filter = ('nome', 'marca', 'categoria', 'unidade_medida', 'fornecedor')
    search_fields = ('nome', 'marca', 'descricao',
                     'fornecedor__nome', 'categoria__nome')
    ordering = ('-id',)


@admin.register(Estoque)
class EstoqueAdmin(admin.ModelAdmin):
    list_display = ('produto', 'quantidade', 'tipo', 'observacao',)
    list_filter = ('produto', 'quantidade', 'tipo', 'observacao',)
    search_fields = ('produto', 'quantidade', 'tipo', 'observacao',)
    ordering = ('-id',)

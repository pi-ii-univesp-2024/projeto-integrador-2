from django.contrib import admin
# from apps.lanchonete.produto.models import Produto
from apps.lanchonete.categoria_produto.models import CategoriaProduto


@admin.register(CategoriaProduto)
class CategoriaProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)

from apps.common.models import BaseModel
from apps.lanchonete.categoria_produto.models import CategoriaProduto
from apps.lanchonete.fornecedor.models import Fornecedor
from django.db import models
from django.utils.translation import gettext_lazy as _


class Produto(BaseModel):
    class UnidadeMedida(models.TextChoices):
        QUILOGRAMAS = "KG", _("Quilogramas")
        LITROS = "L", _("Litros")
        UNIDADES = "UN", _("Unidades")

    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    marca = models.TextField(blank=True, null=True)
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    categoria = models.ForeignKey(
        CategoriaProduto, on_delete=models.CASCADE, related_name='produtos')
    unidade_medida = models.CharField(
        max_length=8, choices=UnidadeMedida.choices)
    preco_por_unidade = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade_estoque = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)
    data_validade = models.DateField(blank=False, null=False)
    quantidade_minima = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)

    def __str__(self) -> str:
        return self.nome

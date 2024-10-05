from django.db import models
from apps.common.models import BaseModel
from django.utils.translation import gettext_lazy as _
from apps.lanchonete.produto.models import Produto


class Estoque(BaseModel):
    class TipoMovimentacao(models.TextChoices):
        ENTRADA = 'ENTRADA', _('Entrada')
        SAIDA = 'SAIDA', _('Saída')

    produto = models.ForeignKey(
        Produto, on_delete=models.CASCADE, related_name='movimentacoes_estoque')
    quantidade = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=7, choices=TipoMovimentacao.choices)
    observacao = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo} de {self.quantidade} {self.produto.nome}"

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

    def criar_movimentacao_estoque(self, quantidade, tipo, observacao=''):
        from apps.lanchonete.estoque.models import Estoque
        Estoque.objects.create(
            produto=self,
            quantidade=quantidade,
            tipo=tipo,
            observacao=observacao
        )

    def save(self, *args, **kwargs):
        # Verifica se é uma criação ou atualização
        is_new = self.pk is None  # Verifica se o produto está sendo criado
        super().save(*args, **kwargs)  # Salva o produto

        # Se for uma criação, registra a entrada no estoque
        if is_new and self.quantidade_estoque > 0:
            self.criar_movimentacao_estoque(
                quantidade=self.quantidade_estoque,
                tipo='ENTRADA',
                observacao='Produto criado com entrada inicial.'
            )
        elif not is_new:
            # Atualização: verifica se houve mudança na quantidade de estoque
            produto_antigo = Produto.objects.get(pk=self.pk)
            diferenca_estoque = self.quantidade_estoque - produto_antigo.quantidade_estoque

            if diferenca_estoque != 0:
                tipo = 'ENTRADA' if diferenca_estoque > 0 else 'SAIDA'
                self.criar_movimentacao_estoque(
                    quantidade=abs(diferenca_estoque),
                    tipo=tipo,
                    observacao='Produto atualizado com ajuste de estoque.'
                )

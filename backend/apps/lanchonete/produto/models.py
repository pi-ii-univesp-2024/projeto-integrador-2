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

    def save(self, *args, **kwargs):
        # Se for a criação do produto (primeira vez salvando)
        from apps.lanchonete.estoque.models import Estoque
        if not self.pk:
            super().save(*args, **kwargs)
            Estoque.objects.create(
                produto=self,
                quantidade=self.quantidade_estoque,
                tipo=Estoque.TipoMovimentacao.ENTRADA,
                observacao='Produto criado com entrada inicial.'
            )
        else:
            # Verifica a quantidade de estoque antes de salvar
            produto_antigo = Produto.objects.get(pk=self.pk)

            # Se a quantidade de estoque for alterada
            if produto_antigo.quantidade_estoque != self.quantidade_estoque:
                diferenca_estoque = self.quantidade_estoque - produto_antigo.quantidade_estoque

                # Se for uma entrada de estoque (aumenta a quantidade)
                if diferenca_estoque > 0:
                    Estoque.objects.create(
                        produto=self,
                        quantidade=diferenca_estoque,
                        tipo=Estoque.TipoMovimentacao.ENTRADA,
                        observacao='Produto atualizado com aumento de estoque.'
                    )

                # Se for uma saída de estoque (reduz a quantidade)
                elif diferenca_estoque < 0:
                    quantidade_retirada = abs(diferenca_estoque)

                    # Verifica se a retirada é maior do que a quantidade disponível
                    if quantidade_retirada > produto_antigo.quantidade_estoque:
                        raise ValueError(
                            "A quantidade retirada não pode ser maior do que a quantidade disponível no estoque."
                        )

                    Estoque.objects.create(
                        produto=self,
                        quantidade=quantidade_retirada,
                        tipo=Estoque.TipoMovimentacao.SAIDA,
                        observacao='Produto atualizado com retirada de estoque.'
                    )

        super().save(*args, **kwargs)

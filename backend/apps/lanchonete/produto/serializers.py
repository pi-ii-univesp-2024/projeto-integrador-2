from rest_framework import serializers
from .models import Produto
from apps.lanchonete.estoque.models import Estoque


class ProdutoSerializer(serializers.ModelSerializer):
    quantidade_estoque = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False)

    class Meta:
        model = Produto
        fields = '__all__'

    def create(self, validated_data):
        # retira quantidade_estoque dos dados validados
        quantidade_estoque = validated_data.pop('quantidade_estoque', 0)

        # cria o produto
        produto_instance = super().create(validated_data)

        # cria a movimentação de estoque ao criar o produto
        if quantidade_estoque > 0:
            Estoque.objects.create(
                produto=produto_instance,
                quantidade=quantidade_estoque,
                tipo=Estoque.TipoMovimentacao.ENTRADA,
                observacao='Produto criado com entrada inicial.'
            )
            produto_instance.quantidade_estoque += quantidade_estoque
            produto_instance.save()

        return produto_instance

    def update(self, instance, validated_data):
        # retira quantidade_estoque dos dados validados
        quantidade_estoque = validated_data.pop('quantidade_estoque', None)

        # atualiza o produto
        produto_instance = super().update(instance, validated_data)

        # se a quantidade_estoque foi informada, cria a movimentação de saída
        if quantidade_estoque is not None and quantidade_estoque < instance.quantidade_estoque:
            quantidade_retirada = instance.quantidade_estoque - quantidade_estoque

            Estoque.objects.create(
                produto=produto_instance,
                quantidade=quantidade_retirada,
                tipo=Estoque.TipoMovimentacao.SAIDA,
                observacao='Produto atualizado com retirada de estoque.'
            )
            produto_instance.quantidade_estoque -= quantidade_retirada
            produto_instance.save()

        return produto_instance

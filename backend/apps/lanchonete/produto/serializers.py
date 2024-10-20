from rest_framework import serializers
from .models import Produto
from apps.lanchonete.estoque.models import Estoque


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

    def create(self, validated_data):
        quantidade_estoque = validated_data.pop(
            'quantidade_estoque', 0) 

        produto = Produto.objects.create(
            **validated_data, quantidade_estoque=quantidade_estoque)

        if quantidade_estoque > 0:
            Estoque.objects.create(
                produto=produto,
                quantidade=quantidade_estoque,
                tipo=Estoque.TipoMovimentacao.ENTRADA,
                observacao='Entrada inicial do produto.'
            )

        return produto

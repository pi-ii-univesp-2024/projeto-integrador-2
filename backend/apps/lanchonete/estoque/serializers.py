from rest_framework import serializers
from .models import Estoque


class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = '__all__'

    def create(self, validated_data):
        produto = validated_data.get('produto')
        quantidade = validated_data.get('quantidade')
        tipo = validated_data.get('tipo')

        # Cria o registro de movimentação de estoque
        estoque = Estoque.objects.create(**validated_data)

        # Atualiza a quantidade_estoque do produto
        if tipo == Estoque.TipoMovimentacao.ENTRADA:
            produto.quantidade_estoque += quantidade
        elif tipo == Estoque.TipoMovimentacao.SAIDA:
            # Verifica se a saída não deixará o estoque negativo
            if produto.quantidade_estoque >= quantidade:
                produto.quantidade_estoque -= quantidade
            else:
                raise serializers.ValidationError('Quantidade de saída maior que a disponível em estoque.')

        produto.save()

        return estoque

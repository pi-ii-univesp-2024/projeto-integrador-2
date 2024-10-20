from rest_framework import serializers
from .models import Produto


class ProdutoSerializer(serializers.ModelSerializer):
    quantidade_estoque = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False)

    class Meta:
        model = Produto
        fields = '__all__'

    def create(self, validated_data):
        # Criação do produto com o comportamento padrão do modelo
        produto_instance = Produto.objects.create(**validated_data)
        return produto_instance

    def update(self, instance, validated_data):
        # Guarda a quantidade de estoque antiga
        quantidade_estoque_antiga = instance.quantidade_estoque

        # Atualiza os atributos do produto
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Verifica se a quantidade de estoque foi alterada
        if 'quantidade_estoque' in validated_data:
            if quantidade_estoque_antiga != instance.quantidade_estoque:
                # Se a quantidade foi alterada, registra a movimentação de estoque
                diferenca_estoque = instance.quantidade_estoque - quantidade_estoque_antiga
                tipo = 'ENTRADA' if diferenca_estoque > 0 else 'SAIDA'
                instance.criar_movimentacao_estoque(
                    quantidade=abs(diferenca_estoque),
                    tipo=tipo,
                    observacao='Produto atualizado com ajuste de estoque.'
                )

        return instance

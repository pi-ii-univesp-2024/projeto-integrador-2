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
        # Atualização do produto com o comportamento padrão do modelo
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

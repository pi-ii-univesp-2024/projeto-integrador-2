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
        # Retira quantidade_estoque dos dados validados
        quantidade_estoque = validated_data.pop('quantidade_estoque', 0)

        # Cria o produto
        produto_instance = super().create(validated_data)

        # Cria a movimentação de estoque ao criar o produto
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
        # Retira quantidade_estoque dos dados validados
        quantidade_estoque = validated_data.pop('quantidade_estoque', None)

        # Atualiza o produto
        produto_instance = super().update(instance, validated_data)

        if quantidade_estoque is not None:
            # Calcula a diferença de estoque
            diferenca_estoque = quantidade_estoque - instance.quantidade_estoque

            # Se a diferença for positiva, houve uma entrada
            if diferenca_estoque > 0:
                Estoque.objects.create(
                    produto=produto_instance,
                    quantidade=diferenca_estoque,
                    tipo=Estoque.TipoMovimentacao.ENTRADA,
                    observacao='Produto atualizado com aumento de estoque.'
                )
                produto_instance.quantidade_estoque += diferenca_estoque
                produto_instance.save()

            # Se a diferença for negativa, houve uma saída
            elif diferenca_estoque < 0:
                # Verifica se a quantidade a ser retirada é maior do que a disponível
                quantidade_retirada = abs(diferenca_estoque)

                if quantidade_retirada > instance.quantidade_estoque:
                    raise serializers.ValidationError(
                        "A quantidade retirada não pode ser maior do que a quantidade disponível no estoque."
                    )

                Estoque.objects.create(
                    produto=produto_instance,
                    quantidade=quantidade_retirada,
                    tipo=Estoque.TipoMovimentacao.SAIDA,
                    observacao='Produto atualizado com retirada de estoque.'
                )
                produto_instance.quantidade_estoque -= quantidade_retirada
                produto_instance.save()

        return produto_instance

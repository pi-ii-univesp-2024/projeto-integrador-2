import pytest
from rest_framework.reverse import reverse
from rest_framework import status
from .factories import EstoqueFactory, ProdutoFactory
from apps.lanchonete.estoque.models import Estoque

@pytest.mark.django_db
def test_criar_entrada_estoque(api_client):
    produto = ProdutoFactory()
    entrada = EstoqueFactory(produto=produto, tipo=Estoque.TipoMovimentacao.ENTRADA)

    data = {
        "produto": entrada.produto.id,
        "quantidade": entrada.quantidade,
        "tipo": entrada.tipo,
        "observacao": entrada.observacao
    }

    url = reverse('estoque-list-create')
    response = api_client.post(url, data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['tipo'] == entrada.tipo
    assert float(response.data['quantidade']) == float(data['quantidade'])
    assert response.data['produto'] == data['produto']


@pytest.mark.django_db
def test_criar_saida_estoque(api_client):
    produto = ProdutoFactory()
    entrada = EstoqueFactory(produto=produto, tipo=Estoque.TipoMovimentacao.ENTRADA)

    saida_data = {
        "produto": produto.id,
        "quantidade": entrada.quantidade,
        "tipo": Estoque.TipoMovimentacao.SAIDA,
        "observacao": "Saída de teste"
    }

    url = reverse('estoque-list-create')
    saida_response = api_client.post(url, saida_data, format='json')

    assert saida_response.status_code == status.HTTP_201_CREATED
    assert saida_response.data['tipo'] == Estoque.TipoMovimentacao.SAIDA
    assert float(saida_response.data['quantidade']) == float(saida_data['quantidade'])
    assert saida_response.data['produto'] == saida_data['produto']

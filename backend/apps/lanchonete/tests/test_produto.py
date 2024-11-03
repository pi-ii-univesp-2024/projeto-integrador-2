import pytest
from rest_framework.reverse import reverse
from rest_framework import status
from .factories import FornecedorFactory, CategoriaProdutoFactory, ProdutoFactory


@pytest.mark.django_db
def test_criar_produto(api_client):
    fornecedor = FornecedorFactory()
    categoria = CategoriaProdutoFactory()

    produto = ProdutoFactory(fornecedor=fornecedor, categoria=categoria)

    data = {
        "nome": produto.nome,
        "descricao": produto.descricao,
        "fornecedor": produto.fornecedor.id,
        "categoria": produto.categoria.id,
        "unidade_medida": produto.unidade_medida,
        "preco_por_unidade": produto.preco_por_unidade,
        "quantidade_estoque": produto.quantidade_estoque,
        "data_validade": produto.data_validade,
        "quantidade_minima": produto.quantidade_minima,
    }

    url = reverse('produto-list')
    response = api_client.post(url, data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['nome'] == data['nome']
    assert response.data['descricao'] == data['descricao']
    assert response.data['fornecedor'] == data['fornecedor']
    assert response.data['categoria'] == data['categoria']

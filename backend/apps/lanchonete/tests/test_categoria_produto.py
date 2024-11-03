import pytest
from rest_framework.reverse import reverse
from rest_framework import status
from .factories import CategoriaProdutoFactory


@pytest.mark.django_db
def test_criar_categoria_produto(api_client):
    categoria = CategoriaProdutoFactory() 

    url = reverse('categoria-list-create')
    data = {"nome": categoria.nome}  
    response = api_client.post(url, data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['nome'] == data['nome']


@pytest.mark.django_db
def test_criar_categoria_produto_com_dados_fakes(api_client):
    categoria = CategoriaProdutoFactory()

    url = reverse('categoria-list-create')
    data = {"nome": categoria.nome} 
    response = api_client.post(url, data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['nome'] == categoria.nome

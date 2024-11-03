import pytest
from rest_framework.reverse import reverse
from rest_framework import status
from .factories import FornecedorFactory 

@pytest.mark.django_db
def test_criar_fornecedor(api_client):
    fornecedor = FornecedorFactory.build()  

    data = {
        "nome": fornecedor.nome,
        "email": fornecedor.email or "",  
        "telefone": fornecedor.telefone or "",
        "cnpj": fornecedor.cnpj or "",
        "logradouro": fornecedor.logradouro or "",
        "complemento": fornecedor.complemento or "",
        "numero": fornecedor.numero or "",
        "bairro": fornecedor.bairro or "",
        "cidade": fornecedor.cidade or "",
        "estado": fornecedor.estado or "",
        "cep": fornecedor.cep or "",
    }

    url = reverse('fornecedor-list-create')
    response = api_client.post(url, data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['nome'] == data['nome']
    assert response.data['email'] == data['email']
    assert response.data['telefone'] == data['telefone']
    assert response.data['cnpj'] == data['cnpj']
    assert response.data['logradouro'] == data['logradouro']
    assert response.data['complemento'] == data['complemento']
    assert response.data['numero'] == data['numero']
    assert response.data['bairro'] == data['bairro']
    assert response.data['cidade'] == data['cidade']
    assert response.data['estado'] == data['estado']
    assert response.data['cep'] == data['cep']

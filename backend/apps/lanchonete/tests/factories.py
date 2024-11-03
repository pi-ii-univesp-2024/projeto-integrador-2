import factory
from apps.lanchonete.produto.models import Produto
from apps.lanchonete.fornecedor.models import Fornecedor
from apps.lanchonete.categoria_produto.models import CategoriaProduto
from apps.lanchonete.estoque.models import Estoque
from faker import Faker

fake = Faker()


class FornecedorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Fornecedor

    nome = factory.Faker('company')
    email = factory.Faker('email')
    telefone = factory.Faker('phone_number')
    logradouro = factory.Faker('street_address')
    complemento = factory.Faker('secondary_address')
    numero = factory.Faker('building_number')
    bairro = factory.Faker('city_suffix')
    cidade = factory.Faker('city')
    estado = factory.Faker('state_abbr')
    cep = factory.Faker('postalcode')

    @factory.lazy_attribute
    def cnpj(self):
        cnpj_base = fake.random_int(
            min=10000000000000, max=99999999999999)
        cnpj_str = str(cnpj_base).zfill(14)
        cnpj = f"{cnpj_str[:2]}.{cnpj_str[2:5]}.{cnpj_str[5:8]}/{cnpj_str[8:12]}-{cnpj_str[12:]}"
        return cnpj


class CategoriaProdutoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CategoriaProduto

    nome = factory.Faker('word')


class ProdutoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Produto

    nome = factory.Faker('word')
    descricao = factory.Faker('text', max_nb_chars=200)
    fornecedor = factory.SubFactory(FornecedorFactory)
    categoria = factory.SubFactory(CategoriaProdutoFactory)
    unidade_medida = factory.Iterator(
        [choice[0] for choice in Produto.UnidadeMedida.choices])
    preco_por_unidade = factory.Faker(
        'pydecimal', left_digits=5, right_digits=2, positive=True)
    quantidade_estoque = factory.Faker(
        'pydecimal', left_digits=5, right_digits=3, positive=True)
    data_validade = factory.Faker(
        'date_between', start_date='today', end_date='+1y')
    quantidade_minima = factory.Faker(
        'pydecimal', left_digits=5, right_digits=3, positive=True)


class EstoqueFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Estoque

    produto = factory.SubFactory(ProdutoFactory)
    quantidade = factory.Faker(
        'pydecimal', left_digits=5, right_digits=2, positive=True)
    tipo = factory.Iterator(
        [Estoque.TipoMovimentacao.ENTRADA, Estoque.TipoMovimentacao.SAIDA])
    observacao = factory.Faker('sentence')

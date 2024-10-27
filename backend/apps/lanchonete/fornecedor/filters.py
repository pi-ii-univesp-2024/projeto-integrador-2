import django_filters
from django.db.models import Q
from .models import Fornecedor


class FornecedorFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_all_fields')

    class Meta:
        model = Fornecedor
        fields = []

    def filter_all_fields(self, queryset, name, value):
        return queryset.filter(
            Q(nome__icontains=value) |
            Q(email__icontains=value) |
            Q(telefone__icontains=value) |
            Q(cnpj__icontains=value) |
            Q(logradouro__icontains=value) |
            Q(complemento__icontains=value) |
            Q(numero__icontains=value) |
            Q(bairro__icontains=value) |
            Q(cidade__icontains=value) |
            Q(estado__icontains=value) |
            Q(cep__icontains=value)
        )

import django_filters
from django.db.models import Q
from .models import Produto


class ProdutoFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_all_fields')

    class Meta:
        model = Produto
        fields = []

    def filter_all_fields(self, queryset, name, value):
        return queryset.filter(
            Q(nome__icontains=value) |
            Q(categoria__nome__icontains=value) |
            Q(marca__icontains=value) |
            Q(fornecedor__nome__icontains=value)
        )

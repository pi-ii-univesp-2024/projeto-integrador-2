import django_filters
from django.db.models import Q
from .models import Estoque


class EstoqueFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_name_and_type')

    class Meta:
        model = Estoque
        fields = []

    def filter_by_name_and_type(self, queryset, name, value):
        return queryset.filter(
            Q(produto__nome__icontains=value) |
            Q(tipo__icontains=value)
        )

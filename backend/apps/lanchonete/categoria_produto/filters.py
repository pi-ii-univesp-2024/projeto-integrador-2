import django_filters
from django.db.models import Q
from .models import CategoriaProduto


class CategoriaFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_name')

    class Meta:
        model = CategoriaProduto
        fields = []

    def filter_by_name(self, queryset, name, value):
        return queryset.filter(nome__icontains=value)

from rest_framework.response import Response


def order_and_paginate_queryset(view, queryset, request):
    # Aplica a ordenação com base no parâmetro 'ordering'
    ordering = request.query_params.get('ordering')
    if ordering:
        ordering_fields = ordering.split(',')
        queryset = queryset.order_by(*ordering_fields)

    # Paginação dos dados
    page = view.paginate_queryset(queryset)
    if page is not None:
        serializer = view.get_serializer(page, many=True)
        return view.get_paginated_response(serializer.data)

    serializer = view.get_serializer(queryset, many=True)
    return Response(serializer.data)

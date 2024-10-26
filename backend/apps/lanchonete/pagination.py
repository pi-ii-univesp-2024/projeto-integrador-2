from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100

    def get_page_size(self, request):
        page_size = request.query_params.get(self.page_size_query_param)
        if page_size is not None:
            return min(int(page_size), self.max_page_size)
        return self.page_size

    def paginate_queryset(self, queryset, request, view=None):
        self.request = request
        self.queryset = queryset
        self.page_size = self.get_page_size(request)

        if self.page_size is None or self.page_size <= 0:
            return None

        self.offset = int(request.query_params.get('offset', 0))
        start = self.offset
        end = start + self.page_size

        self.paginator = queryset[start:end]

        if self.paginator:
            self.count = queryset.count()
            return self.paginator

        return None

    def get_paginated_response(self, data):
        next_offset = self.offset + self.page_size if self.offset + \
            self.page_size < self.count else None
        previous_offset = self.offset - self.page_size if self.offset > 0 else None

        return Response({
            'count': self.count,
            'next': next_offset,
            'previous': previous_offset,
            'results': data,
        })

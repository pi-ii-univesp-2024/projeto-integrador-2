from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# cada path será para uma entidade (pasta) dentro de apps/lanchonete/ENTIDADE/urls.py
#  exemplo: path('produtos/', include('apps.lanchonete.produto.urls')), onde 'produtos' é uma entidade (pasta)

urlpatterns = [
    path('produtos/', include('apps.lanchonete.produto.urls')),
    path('categorias_produtos/', include('apps.lanchonete.categoria_produto.urls')),
    path('fornecedores/', include('apps.lanchonete.fornecedor.urls')),
    path('estoques/', include('apps.lanchonete.estoque.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

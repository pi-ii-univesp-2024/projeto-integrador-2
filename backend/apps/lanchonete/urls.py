from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# cada path será para um model (pasta) dentro de apps/lanchonete/MODEL/urls.py
#  exemplo: path('produtos/', include('apps.lanchonete.produtos.urls')), onde 'produtos' é um model (pasta)

urlpatterns = [
    path('produtos/', include('apps.lanchonete.produtos.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

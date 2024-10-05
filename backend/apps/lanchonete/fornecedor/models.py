from apps.common.models import BaseModel
from django.db import models


class Fornecedor(BaseModel):
    nome = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return self.nome

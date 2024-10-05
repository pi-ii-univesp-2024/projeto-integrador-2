# Generated by Django 5.1.1 on 2024-10-05 18:22

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lanchonete', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fornecedor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('nome', models.CharField(max_length=255)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('telefone', models.CharField(blank=True, max_length=20, null=True)),
                ('endereco', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('nome', models.CharField(max_length=255)),
                ('descricao', models.TextField(blank=True, null=True)),
                ('unidade_medida', models.CharField(choices=[('KG', 'Quilogramas'), ('L', 'Litros'), ('UN', 'Unidades')], max_length=8)),
                ('preco_por_unidade', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data_validade', models.DateField(blank=True, null=True)),
                ('quantidade_estoque', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantidade_minima', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produtos', to='lanchonete.categoriaproduto')),
                ('fornecedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lanchonete.fornecedor')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

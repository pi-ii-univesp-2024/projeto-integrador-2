# Generated by Django 5.1.1 on 2024-10-05 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lanchonete', '0004_alter_produto_quantidade_estoque'),
    ]

    operations = [
        migrations.AddField(
            model_name='produto',
            name='marca',
            field=models.TextField(blank=True, null=True),
        ),
    ]

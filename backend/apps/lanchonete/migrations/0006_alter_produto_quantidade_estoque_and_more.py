# Generated by Django 5.1.1 on 2024-10-05 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lanchonete', '0005_produto_marca'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produto',
            name='quantidade_estoque',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='produto',
            name='quantidade_minima',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
    ]

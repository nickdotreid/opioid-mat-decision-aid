# Generated by Django 2.2.1 on 2019-08-07 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0009_auto_20190807_1637'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='next_page',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='chapters.Page'),
        ),
        migrations.AlterField(
            model_name='page',
            name='chapter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='chapters.Chapter'),
        ),
    ]

# Generated by Django 2.2.1 on 2020-04-23 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0010_auto_20190807_1651'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chapter',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='page',
            name='slug',
        ),
    ]

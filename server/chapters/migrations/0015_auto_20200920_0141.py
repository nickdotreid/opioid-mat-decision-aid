# Generated by Django 2.2.1 on 2020-09-20 01:41

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0014_auto_20200920_0131'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderablecontent',
            name='content_type',
            field=models.CharField(default='text', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orderablecontent',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}),
            preserve_default=False,
        ),
    ]
# Generated by Django 2.2.1 on 2019-06-19 02:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quizes', '0001_initial'),
        ('chapters', '0005_page_chart'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='quiz',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='quizes.Quiz'),
        ),
    ]

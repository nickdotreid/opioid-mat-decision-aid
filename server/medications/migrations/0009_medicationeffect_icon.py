# Generated by Django 2.2.1 on 2019-06-22 01:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medication_icons', '0002_delete_medicationeffecticon'),
        ('medications', '0008_auto_20190610_1907'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicationeffect',
            name='icon',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='medication_icons.Icon'),
        ),
    ]

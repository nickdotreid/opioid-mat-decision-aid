# Generated by Django 2.2.1 on 2019-06-22 00:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('medications', '0008_auto_20190610_1907'),
    ]

    operations = [
        migrations.CreateModel(
            name='Icon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('image', models.ImageField(upload_to='icons')),
            ],
        ),
        migrations.CreateModel(
            name='MedicationEffectIcon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medication_icons.Icon')),
                ('medication_effect', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='icon', to='medications.MedicationEffect')),
            ],
        ),
    ]

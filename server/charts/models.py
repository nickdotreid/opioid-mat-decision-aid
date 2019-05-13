from django.db import models

from medications.models import Effect
from medications.models import Medication

class Chart(models.Model):
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=100)

    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class ChartOrdable(models.Model):
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    class Meta:
        abstract = True

class ChartEffect(ChartOrdable):
    effect = models.ForeignKey(
        Effect,
        on_delete=models.CASCADE,
        related_name='effects'    
    )

class ChartMedication(models.Model):
    medication = models.ForeignKey(
        Medication,
        on_delete=models.CASCADE,
        related_name='medications'
    )

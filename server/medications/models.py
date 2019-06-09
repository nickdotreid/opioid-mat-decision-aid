from django.db import models
from stringcase import camelcase

class BaseObject(models.Model):
    name = models.CharField(max_length=150)
    slug = models.CharField(max_length=250)

    class Meta:
        abstract = True

    @property
    def key(self):
        return camelcase(self.slug.replace('-','_'))

    def __str__(self):
        return self.name

class Medication(BaseObject):
    pass

class Effect(BaseObject):
    pass

class MedicationEffect(models.Model):
    medication = models.ForeignKey(
        Medication,
        on_delete=models.CASCADE,
        related_name='effects'
    )
    effect = models.ForeignKey(
        Effect,
        on_delete=models.CASCADE
    )

    value = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return '%s: %s' % (self.medication, self.effect)

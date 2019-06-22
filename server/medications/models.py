from django.db import models
from stringcase import camelcase

from ckeditor.fields import RichTextField

from medication_icons.models import Icon

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

    CATEGORIES = [
        ('circle', 'Circle chart'),
        ('icon', 'Icon'),
        ('list', 'List of values'),
        ('timeline', 'Timeline of values')
    ]

    category = models.CharField(max_length=250, choices=CATEGORIES, null=True, blank=True)
    description = RichTextField(null=True, blank=True)

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
    icon = models.ForeignKey(
        Icon,
        null = True,
        blank = True,
        on_delete=models.SET_NULL
    )

    label = models.CharField(max_length=250, null=True, blank=True)
    value = models.CharField(max_length=250, null=True, blank=True)
    comparison = models.CharField(max_length=250, null=True, blank=True)

    day = models.PositiveIntegerField(null=True, blank=True)
    order = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['day', 'order']

    def __str__(self):
        return '%s: %s' % (self.medication, self.effect)

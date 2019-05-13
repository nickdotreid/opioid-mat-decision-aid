from django.db import models

class BaseObject(models.Model):
    name = models.CharField(max_length=150)
    slug = models.CharField(max_length=250)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

class Medication(BaseObject):
    pass

class Effect(BaseObject):
    pass

class MedicationEffect(models.Model):
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    effect = models.ForeignKey(Effect, on_delete=models.CASCADE)

    short_description = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return '%s: %s' % (self.medication, self.effect)

from django.db import models
from django.db.models.signals import pre_save

from slugify import slugify

class Quiz(models.Model):
    title = models.CharField(
        max_length=150,
        unique=True
        )
    slug = models.CharField(max_length=250, unique=True)
    
    def __str__(self):
        return self.title

class Question(models.Model):
    text = models.CharField(max_length=250)
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text

def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.title)

pre_save.connect(set_slug, sender=Quiz)

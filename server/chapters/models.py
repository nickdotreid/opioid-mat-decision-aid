from django.db import models

from ckeditor.fields import RichTextField

from charts.models import Chart

class OrdableContent(models.Model):
    order = models.PositiveIntegerField()

    class Meta:
        abstract = True
        ordering = ['order']


class Chapter(OrdableContent):
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, unique=True)

    published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class Page(OrdableContent):
    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="pages"
    )
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, unique=True)
    published = models.BooleanField(default=True)

    content = RichTextField(null=True, blank=True)

    chart = models.ForeignKey(
        Chart,
        on_delete = models.SET_NULL,
        null = True,
        blank = True
    )

from django.db import models

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
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, unique=True)

    published = models.BooleanField(default=True)

    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="pages"
    )

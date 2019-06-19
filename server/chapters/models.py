from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from ckeditor.fields import RichTextField
from slugify import slugify

from charts.models import Chart
from quizes.models import Quiz

class Orderable(models.Model):
    order = models.PositiveIntegerField()

    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, unique=True)

    published = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['order']

    def __str__(self):
        return self.title

class Chapter(Orderable):
    pass

class Page(Orderable):
    chapter = models.ForeignKey(
        Chapter,
        on_delete=models.CASCADE,
        related_name="pages"
    )
    content = RichTextField(null=True, blank=True)
    chart = models.ForeignKey(
        Chart,
        on_delete = models.SET_NULL,
        null = True,
        blank = True
    )
    quiz = models.ForeignKey(
        Quiz,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )

    def __str__(self):
        return "%s: %s" % (self.chapter.title, self.title)

def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.title)

pre_save.connect(set_slug, sender=Chapter)
pre_save.connect(set_slug, sender=Page)


@receiver(pre_save, sender=Chapter)
def chapter_set_order(sender, instance, **kwargs):
    if not instance.order:
        total_pages = Chapter.objects.count()
        instance.order = (total_pages + 1) * 10

@receiver(pre_save, sender=Page)
def page_set_order(sender, instance, **kwargs):
    if not instance.order:
        total_pages = Page.objects.filter(chapter=instance.chapter).count()
        instance.order = (total_pages + 1) * 10

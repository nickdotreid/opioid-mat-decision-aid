from django.db import models
from django.contrib.postgres.fields import JSONField

from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField 
from slugify import slugify

from charts.models import Chart
from quizes.models import Quiz

class Orderable(models.Model):
    order = models.PositiveIntegerField()

    title = models.CharField(max_length=250)

    published = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['order']

    def __str__(self):
        return self.title

class Chapter(Orderable):
    
    @property
    def pages(self):
        pages = Page.objects.filter(chapter = self).all()
        return list(pages)

    def save(self, *args, **kwargs):
        if not self.order:
            total_pages = Chapter.objects.count()
            self.order = (total_pages + 1) * 10
        super().save(*args, **kwargs)

class Page(Orderable):
    content = RichTextUploadingField(null=True, blank=True)
    
    chapter = models.ForeignKey(
        Chapter,
        null = True,
        on_delete=models.SET_NULL,
        related_name = '+'
    )
    next_page = models.ForeignKey(
        'self',
        null = True,
        on_delete = models.SET_NULL,
        related_name = '+'
    )
    
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

    def save(self, *args, **kwargs):
        if not self.order:
            total_pages = Page.objects.filter(chapter=self.chapter).count()
            self.order = (total_pages + 1) * 10
        super().save(*args, **kwargs)

    def get_contents(self):
        return OrderableContent.objects.filter(
            page = self
        ).all()

    @property
    def contents(self):
        if not hasattr(self, '__contents'):
            self.__contents = self.get_contents()
        return self.__contents

    def __str__(self):
        return "%s: %s" % (self.chapter.title, self.title)

class OrderableContent(Orderable):

    page = models.ForeignKey(
        Page,
        on_delete = models.CASCADE,
        related_name = '+'
    )
    content_type = models.CharField(max_length=150)
    data = JSONField()

    def save(self, *args, **kwargs):
        if not self.order:
            total_pages = OrderableContent.objects.filter(page=self.page).count()
            self.order = (total_pages + 1) * 10
        if not self.title:
            self.title = self.content_type
        super().save(*args, **kwargs)

    def __str__(self):
        return 'Orderable content {order} - {title} (page: {page_id})'.format({
            'order': self.order,
            'page_id': self.page_id,
            'title': self.title
        })


class PageRedirect(models.Model):
    test_page = models.ForeignKey(
        Page,
        on_delete = models.CASCADE,
        related_name = '+'
    )
    target_page = models.ForeignKey(
        Page,
        null = True,
        on_delete = models.SET_NULL,
        related_name = '+'
    )

class PageRedirectCondition(models.Model):
    redirect = models.ForeignKey(
        PageRedirect,
        on_delete = models.CASCADE,
        related_name = '+'
    )
    quiz = models.ForeignKey(
        Quiz,
        on_delete = models.CASCADE,
        related_name = '+'
    )
    score_to_pass = models.PositiveIntegerField()

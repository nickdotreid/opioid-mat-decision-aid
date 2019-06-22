from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

class Icon(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='icons')
    thumbnail = ImageSpecField(
        source = 'image',
        processors = [
            ResizeToFill(60,60)
        ],
        format='PNG'
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

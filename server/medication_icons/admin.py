from django.contrib import admin
from imagekit.admin import AdminThumbnail

from .models import Icon

@admin.register(Icon)
class IconAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon_thumbnail')
    icon_thumbnail = AdminThumbnail(image_field='thumbnail')

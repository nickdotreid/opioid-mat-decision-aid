from django.contrib import admin

from admin_ordering.admin import OrderableAdmin

from .models import Chapter
from .models import Page

class PageInline(OrderableAdmin, admin.TabularInline):
    model = Page
    ordering = ['order']
    ordering_field = 'order'

@admin.register(Chapter)
class ChapterAdmin(OrderableAdmin, admin.ModelAdmin):
    ordering = ['order']
    ordering_field = 'order'

    list_display = ['title', 'order']
    list_editable = ['order']

    inlines = [
        PageInline
    ]

from django.contrib import admin

from .models import Editor

@admin.register(Editor)
class PageAdmin(admin.ModelAdmin):
    pass

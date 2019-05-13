from django.contrib import admin

from .models import Chart

@admin.register(Chart)
class ChartAdmin(admin.ModelAdmin):
    pass

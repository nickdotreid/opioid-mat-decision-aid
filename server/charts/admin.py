from django.contrib import admin

from admin_ordering.admin import OrderableAdmin

from .models import Chart
from .models import ChartEffect
from .models import ChartMedication

class EffectInline(OrderableAdmin, admin.TabularInline):
    model = ChartEffect

    ordering_field = 'order'


class MedicationInline(OrderableAdmin, admin.TabularInline):
    model = ChartMedication

    ordering_field = 'order'


@admin.register(Chart)
class ChartAdmin(admin.ModelAdmin):
    inlines = [
        MedicationInline,
        EffectInline
    ]

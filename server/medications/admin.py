from django.contrib import admin

from .models import Effect
from .models import Medication
from .models import MedicationEffect

@admin.register(Effect)
class EffectAdmin(admin.ModelAdmin):
    pass

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    pass

@admin.register(MedicationEffect)
class MedicationEffectAdmin(admin.ModelAdmin):
    list_filter = [
        'effect__name',
        'medication__name'
    ]

from django.contrib import admin

from .models import Effect
from .models import Medication

@admin.register(Effect)
class EffectAdmin(admin.ModelAdmin):
    pass

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    pass

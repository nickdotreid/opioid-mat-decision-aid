from django.contrib import admin

from .models import Effect
from .models import Medication
from .models import MedicationEffect

def medication_effect_factory(medication=None, effect=None):
    class MedicationEffectInline(admin.TabularInline):
        model = MedicationEffect
        extra = 0
        
        @property
        def verbose_name_plural(self):
            if medication:
                return medication.name
            if effect:
                return effect.name
            return super().verbose_name_plural

        def get_queryset(self, request):
            qs = super().get_queryset(request)
            if medication:
                qs = qs.filter(medication=medication)
            if effect:
                qs = qs.filter(effect=effect)
            return qs

        def formfield_for_foreignkey(self, db_field, request, **kwargs):
            if db_field.name == 'medication' and medication:
                kwargs['initial'] = medication.id
                return db_field.formfield(**kwargs)
            if db_field.name == 'effect' and effect:
                kwargs['initial'] = effect.id
                return db_field.formfield(**kwargs)
            return super().formfield_for_foreignkey(db_field, request, **kwargs)

    return MedicationEffectInline
    

@admin.register(Effect)
class EffectAdmin(admin.ModelAdmin):

    def get_inline_instances(self, request, obj=None):
        self.inlines = [medication_effect_factory(medication=medication) for medication in Medication.objects.all()]
        return super().get_inline_instances(request, obj)

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    
    def get_inline_instances(self, request, obj=None):
        self.inlines = [medication_effect_factory(effect=effect) for effect in Effect.objects.all()]
        return super().get_inline_instances(request, obj)

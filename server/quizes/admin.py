from django.contrib import admin

from admin_ordering.admin import OrderableAdmin

from .models import Question
from .models import Quiz

class QuestionInline(OrderableAdmin, admin.TabularInline):
    model = Question
    fields = ['order', 'text']
    ordering_field = 'order'

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ['title']
    fields = [
        'title',
        'description',
        'points_to_pass'
    ]
    inlines = [
        QuestionInline
    ]
    ordering = ['title']
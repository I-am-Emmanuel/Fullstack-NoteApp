from django.contrib import admin
from .models import Note
# Register your models here.

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['username']
    list_per_page = 10
    ordering = ['timestamp']
    search_fields = ['username__istartswith', 'title__istartswith']
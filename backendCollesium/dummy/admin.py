from django.contrib import admin
from .models import dummyModel
# Register your models here.
class DummyModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'descrption','value','image')  # Adjust fields as necessary
    search_fields = ('name',)  # Adjust fields as necessary
admin.site.register(dummyModel, DummyModelAdmin)
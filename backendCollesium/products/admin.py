from django.contrib import admin
from .models import products
# Register your models here.

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'stocks', 'price','image')  # Adjust fields as necessary
    search_fields = ('name',)  # Adjust fields as necessary
admin.site.register(products, ProductsAdmin)
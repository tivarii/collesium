from django.db import models
from categories.models import Categories
from subcategories.models import SubCategoriesModel
from generic.models import GenericModel
# Create your models here.
class products(GenericModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='products')
    subcategory = models.ForeignKey(SubCategoriesModel, on_delete=models.CASCADE, related_name='products')
    stocks = models.IntegerField(default=0)
    image = models.ImageField('media/products/', blank=True, null=True)
    # created_at= models.DateTimeField(auto_now_add=True)  # Set timestamp on creation
    # updated_at= models.DateTimeField(auto_now=True)  # Update timestamp on modification
    # extra_data = models.JSONField(default=dict, blank=True)  # Stores arbitrary JSON data

    def __str__(self):
        return self.name

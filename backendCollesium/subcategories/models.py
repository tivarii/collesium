from django.db import models
from generic.models import GenericModel
from categories.models import Categories
# Create your models here.

class SubCategoriesModel(GenericModel):
    subCategoryname = models.CharField(max_length=255)
    subCategorydescription = models.TextField(blank=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='subcategories')

    class Meta:
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return self.subCategoryname
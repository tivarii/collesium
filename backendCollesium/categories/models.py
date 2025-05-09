from django.db import models
from generic.models import GenericModel
# Create your models here.
class Categories(GenericModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
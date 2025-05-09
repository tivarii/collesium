from django.db import models

# Create your models here.
class dummyModel(models.Model):
    name = models.CharField(max_length=255)
    descrption = models.TextField(blank=True)
    value = models.IntegerField(default=0)
    image = models.ImageField(upload_to='images/dummy/', blank=True, null=True)


    def __str__(self):
        return self.name

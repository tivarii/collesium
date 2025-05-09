from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class GenericModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)  # Set timestamp on creation
    updated_at = models.DateTimeField(auto_now=True)  # Update timestamp on modification
    extra_data = models.JSONField(default=dict, blank=True,null=True,)  # Stores arbitrary JSON data

    def __str__(self):
        return f"CustomModel {self.id}"



        # class Subcategory(GenericModel):
        #     name = models.CharField(max_length=255)
        #     description = models.TextField(blank=True)
        #     category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='subcategories')

        #     class Meta:
        #         verbose_name_plural = "Subcategories"


        # class Product(GenericModel):
        #     name = models.CharField(max_length=255)
        #     description = models.TextField(blank=True)
        #     price = models.DecimalField(max_digits=10, decimal_places=2)
        #     category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
        #     subcategory = models.ForeignKey('Subcategory', on_delete=models.CASCADE, related_name='products')
        #     image = models.URLField(blank=True)
        #     in_stock = models.BooleanField(default=True)

# class CustomUserModelManager(BaseUserManager):
#     def create_user(self, username, email, password=None):
#         if not username:
#             raise ValueError('Users must have a username')
#         if not email:
#             raise ValueError('Users must have an email address')
#         user = self.Model(
#             username=username,
#             email=self.normalize_email(email),
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, email, password=None):
#         user = self.create_user(
#             username=username,
#             email=email,
#             password=password,
#         )
#         user.is_admin = True
#         user.is_staff = True
#         user.save(using=self._db)
#         return user

# class CustomUserModel(AbstractBaseUser, PermissionsMixin, models.Model):
#     userId = models.AutoField(primary_key=True)
#     username = models.CharField(max_length=150, unique=True)
#     email = models.EmailField(unique=True)
#     # password = models.CharField(max_length=128)  # Store hashed password
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)

#     objects = CustomUserModelManager()

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['email']

#     def __str__(self):
#         return self.username

#     def has_perm(self, perm, obj=None):
#         return True

#     def has_module_perms(self, app_label):
#         return True

#     @property
#     def is_staff(self):
#         return self.is_admin
#     class Meta:
#         verbose_name = 'CustomUserModel'

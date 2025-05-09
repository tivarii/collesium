from rest_framework import serializers
from .models import SubCategoriesModel

class SubCategoriesSerializer(serializers.ModelSerializer):
    class Meta:    
        model = SubCategoriesModel
        fields = '__all__'
        # fields = ['id', 'subCategoryname', 'subCategorydescription', 'category', 'extra_data', 'created_at', 'updated_at']
        # read_only_fields = ['id', 'created_at', 'updated_at', ]
        # extra_kwargs = {
        #     'subCategoryname': {'required': True},
        #     'subCategorydescription': {'required': False,'allow_blank':True},
        #     'extra_data': {'required': False, 'allow_null': True},  # Optional field, can be omitted if not needed
        #     'category': {'required': True}
        # }
        # 'extra_data': {'required': False}  # Optional field, can be omitted if not needed 
from generic.serializers import GenericModelSerializer
from .models import products

class ProductsSerializer(GenericModelSerializer):
    class Meta(GenericModelSerializer.Meta):
        model = products
        fields = '__all__'  # Includes all fields from GenericModel and Categories
        # read_only_fields = ['id', 'created_at', 'updated_at']
        # extra_kwargs = {
        #     'name': {'required': True},
        #     'description': {'required': False}
        #     category: {'required': True}
        #     subcategory: {'required': True}
        #     price: {'required': True}
        #     stock: {'required': True}
        #     image: {'required': False}
        # }
from generic.serializers import GenericModelSerializer
from .models import Categories

class CategoriesSerializer(GenericModelSerializer):
    class Meta(GenericModelSerializer.Meta):
        model = Categories
        fields = '__all__'  # Includes all fields from GenericModel and Categories
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': False}
        }
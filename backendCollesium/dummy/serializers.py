from .models import dummyModel
from rest_framework import serializers

class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model = dummyModel
        fields = '__all__'

    def validate_value(self,value):
        if value <= 0:
            raise serializers.ValidationError("Value must be greater than 0. ")
        return value
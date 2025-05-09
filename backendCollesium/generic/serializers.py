from rest_framework import serializers
from .models import GenericModel
# from .models import CustomUserModel
from django.contrib.auth.models import User


class GenericModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericModel
        fields = '__all__'  # Includes all fields

    def validate_extra_data(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("extra_data must be a dictionary.")
        return value

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password']
    def create(self,validate_data):
        user = User.objects.create_user(
            username = validate_data['username'],
            email = validate_data['email'],
            password = validate_data['password']
        )
        return user

class SigninSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField()
    class Meta:
        model = User
        fields = ['username','password']
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        if username and password:
            user = User.objects.filter(username=username).first()
            if user and user.check_password(password):
                return user
            else:
                raise serializers.ValidationError("Invalid credentials")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'")

# class CustomUserModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         Model = CustomUserModel
#         fields = [
#             'userId',
#             'username',
#             'email',
#             'password',
#         ]
#     def create(self, validated_data):
#         user = CustomUserModel.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user

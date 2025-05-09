from rest_framework import viewsets, status
from .models import GenericModel
from .serializers import GenericModelSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import SignupSerializer,SigninSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class GenericModelViewSet(viewsets.ModelViewSet):
    queryset = GenericModel.objects.all()
    serializer_class = GenericModelSerializer
    # def list(self, request):
    #     queryset = GenericModel.objects.all()
    #     serializer = GenericModelSerializer(queryset, many=True)
    #     return Response(serializer.data)

    

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            instance = self.get_object()
        except self.queryset.model.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            instance = self.get_object()
        except self.queryset.model.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GenericModelSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignupViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.objects.all()
        serializer = SignupSerializer(queryset, many=True)
        return Response(serializer.data)

class SigninViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SigninSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this username does not exist"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check password
        if not user.check_password(password):
            return Response(
                {"error": "Incorrect password"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        serializer = self.get_serializer(user)
        return Response({
            "user": serializer.data,
            "message": "Login successful",
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
        }, status=status.HTTP_200_OK)


class GoogleLoginViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:3000/'
from django.shortcuts import render
from .models import products
from .serializers import ProductsSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from generic.views import GenericModelViewSet
class ProductsViewSet(GenericModelViewSet):
    queryset = products.objects.all()
    serializer_class = ProductsSerializer

    def get_queryset(self):
        queryset = products.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        serializer = ProductsSerializer(queryset, many=True)
        return Response(serializer.data)

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
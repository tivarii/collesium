from django.shortcuts import render
from generic.views import GenericModelViewSet
# Create your views here.
from .models import SubCategoriesModel
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import status
from .serializers import SubCategoriesSerializer
class SubCategoriesViewSet(GenericModelViewSet):
    queryset = SubCategoriesModel.objects.all()
    serializer_class = SubCategoriesSerializer
    def get_queryset(self):
        queryset = SubCategoriesModel.objects.all()
        name = self.request.query_params.get('subCategoryname', None)
        if name:
            queryset = queryset.filter(subCategoryname__icontains=name)
        return queryset
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
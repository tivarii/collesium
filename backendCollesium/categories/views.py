from generic.views import GenericModelViewSet
from rest_framework import status
from rest_framework.response import Response
from .models import Categories
from .serializers import CategoriesSerializer

class CategoriesViewSet(GenericModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    # def get_queryset(self):
    #     queryset = Categories.objects.all()
    #     name = self.request.query_params.get('name', None)
    #     if name:
    #         queryset = queryset.filter(name__icontains=name)
    #     return queryset

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         self.perform_create(serializer)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, serializer):
    #     serializer.save()

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data)
    #     if serializer.is_valid():
    #         self.perform_update(serializer)
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_update(self, serializer):
    #     serializer.save()

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
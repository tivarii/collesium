from django.shortcuts import render
from .models import dummyModel
from .serializers import DummySerializer
from rest_framework import viewsets
from rest_framework.response import Response
# Create your views here.

class DummyViewSet(viewsets.ModelViewSet):
    queryset = dummyModel.objects.all()
    serializer_class = DummySerializer

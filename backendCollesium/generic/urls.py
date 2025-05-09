from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import GenericModelViewSet,SigninViewSet,SignupViewSet

router = DefaultRouter()
router.register(r'generic', GenericModelViewSet, basename='generic')
router.register(r'signup', SignupViewSet, basename='signup')
router.register(r'signin',SigninViewSet, basename='signin')

urlpatterns = router.urls
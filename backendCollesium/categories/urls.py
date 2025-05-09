from .views import CategoriesViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'categories', CategoriesViewSet, basename='categories')

urlpatterns = router.urls
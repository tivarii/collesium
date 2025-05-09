from rest_framework.routers import DefaultRouter

router = DefaultRouter()
from .views import SubCategoriesViewSet

router.register(r'subcategories',SubCategoriesViewSet,basename='subcategories')
urlpatterns = router.urls
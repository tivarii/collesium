from rest_framework.routers import DefaultRouter
from .views import DummyViewSet

router = DefaultRouter()
router.register(r'dummy',DummyViewSet,basename='dummy')
urlpatterns = router.urls
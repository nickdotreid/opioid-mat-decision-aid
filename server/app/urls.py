from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path

from chapters.views import ListContent
from chapters.views import PageListView
from charts.views import ListCharts
from medications.views import ListAllMedications

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/chapters/', ListContent.as_view(), name='chapters-content'),
    path('api/charts/', ListCharts.as_view(), name='charts-all'),
    path('api/medications/', ListAllMedications.as_view(), name='medications-all'),
    path('api/pages/', PageListView.as_view(), name='page-list')
] + static(settings.MEDIA_URL_DEFAULT, document_root=settings.MEDIA_ROOT)

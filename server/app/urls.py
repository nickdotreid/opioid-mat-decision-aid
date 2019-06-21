"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path

from chapters.views import ListContent
from charts.views import ListCharts
from medications.views import ListAllMedications

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'^ckeditor/', include('ckeditor_uploader.urls')),
    path('api/chapters/', ListContent.as_view(), name="chapters-content"),
    path('api/charts/', ListCharts.as_view(), name="charts-all"),
    path('api/medications/', ListAllMedications.as_view(), name="medications-all")
] + static(settings.MEDIA_URL_DEFAULT, document_root=settings.MEDIA_ROOT)

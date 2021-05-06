from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.views import PasswordResetCompleteView
from django.urls import include
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from chapters.views import ListChapters
from chapters.views import ChapterDetailsView
from chapters.views import PageListView
from chapters.views import PageDetailsView
from chapters.views import PageContentDetailView
from chapters.views import PageContentListView
from chapters.views import ChapterPagesView
from chapters.views import QuestionListView
from charts.views import ListCharts
from editors.views import EditorLogin
from medications.views import ListAllMedications


urlpatterns = [
    path('admin/', admin.site.urls),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset-password/complete/', PasswordResetConfirmView.as_view(), name='password_reset_complete'),
    path('reset-password/sent/', PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset-password/', PasswordResetView.as_view()),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/chapters/<chapter_id>/pages/', ChapterPagesView.as_view(), name='chapters-pages-view'),
    path('api/chapters/<chapter_id>/', ChapterDetailsView.as_view(), name='chapters-detail'),
    path('api/chapters/', ListChapters.as_view(), name='chapters-content'),
    path('api/charts/', ListCharts.as_view(), name='charts-all'),
    path('api/login/', EditorLogin.as_view(), name='api-login'),
    path('api/medications/', ListAllMedications.as_view(), name='medications-all'),
    path('api/pages/<page_id>/content/<content_id>', PageContentDetailView.as_view(), name='page-content-detail'),
    path('api/pages/<page_id>/content/', PageContentListView.as_view(), name='page-content-list'),
    path('api/pages/<page_id>/', PageDetailsView.as_view(), name='page-details'),
    path('api/pages/', PageListView.as_view(), name='page-list'),
    path('api/questions/', QuestionListView.as_view(), name='question-list')
] + static(settings.MEDIA_URL_DEFAULT, document_root=settings.MEDIA_ROOT)

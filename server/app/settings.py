import os
import environ

env = environ.Env()
env_file_path = '/server/.env'
if os.path.isfile(env_file_path):
    env.read_env(env_file_path)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = env.str('SECRET_KEY', default='secret-key')
DEBUG = env.bool('DEBUG', default=False)

ALLOWED_HOSTS = env.str('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

if 'DATABASE_URL' in os.environ:
    DATABASES = {
        'default': env.db(),
    }
else:
    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'tempdb',
    }
}

if 'SENDGRID_API_KEY' in os.environ:
    EMAIL_HOST = 'smtp.sendgrid.net'
    EMAIL_HOST_USER = 'apikey'
    EMAIL_HOST_PASSWORD = os.environ['SENDGRID_API_KEY']
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True

FIXTURE_DIRS = ['fixtures']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'admin_ordering',
    'ckeditor',
    'ckeditor_uploader',
    'imagekit',
    'rest_framework',
    'rest_framework.authtoken',
    'editors',
    'medications',
    'medication_icons',
    'charts',
    'quizes',
    'chapters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication'
    ]
}

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = 'static'

# MEDIA

MEDIA_ROOT = 'media'
MEDIA_URL_DEFAULT = '/media/'
MEDIA_URL = env.str('MEDIA_URL', default=MEDIA_URL_DEFAULT)

# CKEDITOR

CKEDITOR_UPLOAD_PATH = "uploads/"

# STORAGES
GS_BUCKET_NAME = env.str('GS_BUCKET_NAME', default='')
if GS_BUCKET_NAME:
    INSTALLED_APPS += ['storages']
    from google.oauth2 import service_account
    GS_PROJECT_ID = env.str('GS_PROJECT_ID')
    GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
        env.str('GS_CREDENTIALS_FILE')
    )
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'


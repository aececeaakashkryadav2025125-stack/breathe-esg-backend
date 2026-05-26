from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "Breathe ESG Backend Running",
        "admin": "/admin/",
        "api_records": "/api/records/",
        "api_upload": "/api/upload/"
    })


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('ingestion.urls')),
]
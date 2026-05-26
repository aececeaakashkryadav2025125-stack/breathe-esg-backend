from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "Breathe ESG Backend Running",
        "status": "success",
        "routes": {
            "admin": "/admin/",
            "records": "/api/records/",
            "upload": "/api/upload/"
        }
    })


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('ingestion.urls')),
]
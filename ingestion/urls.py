from django.urls import path

from .views import upload_file, get_records

urlpatterns = [

    path('upload/', upload_file),
    path('records/', get_records),

]
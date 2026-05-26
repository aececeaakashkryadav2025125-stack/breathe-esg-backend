from django.contrib import admin
from .models import Tenant, UploadedFile, EmissionRecord


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'tenant', 'source_type', 'uploaded_at']


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'source_type',
        'normalized_value',
        'normalized_unit',
        'category',
        'suspicious'
    ]

    list_filter = ['source_type', 'suspicious']
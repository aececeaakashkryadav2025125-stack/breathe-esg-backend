from django.db import models


class Tenant(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class UploadedFile(models.Model):

    SOURCE_CHOICES = [
        ('sap', 'SAP'),
        ('utility', 'Utility'),
        ('travel', 'Travel'),
    ]

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    file = models.FileField(
        upload_to='uploads/'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.source_type} upload"


class EmissionRecord(models.Model):

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50
    )

    raw_data = models.JSONField()

    original_raw_data = models.JSONField(
        null=True,
        blank=True
    )

    normalized_value = models.FloatField()

    normalized_unit = models.CharField(
        max_length=50
    )

    category = models.CharField(
        max_length=100
    )

    suspicious = models.BooleanField(
        default=False
    )

    approved = models.BooleanField(
        default=False
    )

    approved_by = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    approved_at = models.DateTimeField(
        null=True,
        blank=True
    )

    edited = models.BooleanField(
        default=False
    )

    edited_at = models.DateTimeField(
        null=True,
        blank=True
    )

    locked_for_audit = models.BooleanField(
        default=False
    )

    imported_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.source_type} - {self.normalized_value}"
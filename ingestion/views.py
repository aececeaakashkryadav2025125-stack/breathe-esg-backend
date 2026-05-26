import pandas as pd

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import Tenant, UploadedFile, EmissionRecord


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):

    uploaded_file = request.FILES.get('file')
    source_type = request.data.get('source_type')

    if uploaded_file is None:
        return Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    tenant, _ = Tenant.objects.get_or_create(
        name="Demo Company"
    )

    try:

        # RESET FILE POINTER IMPORTANT
        uploaded_file.seek(0)

        # READ CSV FIRST
        df = pd.read_csv(uploaded_file)

        # RESET AGAIN BEFORE SAVING
        uploaded_file.seek(0)

        # SAVE FILE
        UploadedFile.objects.create(
            tenant=tenant,
            source_type=source_type,
            file=uploaded_file
        )

        created_records = []

        for _, row in df.iterrows():

            suspicious = False
            value = 0
            unit = "unknown"

            if source_type == "sap":

                value = float(row.get("Quantity", 0))
                unit = row.get("Unit", "L")

                if value > 50000:
                    suspicious = True

            elif source_type == "utility":

                value = float(row.get("Consumption", 0))
                unit = row.get("Unit", "kWh")

                if value > 100000:
                    suspicious = True

            elif source_type == "travel":

                value = 1000
                unit = "km"

            EmissionRecord.objects.create(
                tenant=tenant,
                source_type=source_type,
                raw_data=row.to_dict(),
                normalized_value=value,
                normalized_unit=unit,
                category=source_type,
                suspicious=suspicious
            )

            created_records.append(1)

        return Response({
            "message": "File uploaded successfully",
            "records_created": len(created_records)
        })

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
import pandas as pd

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import Tenant, UploadedFile, EmissionRecord
from .serializers import EmissionRecordSerializer


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):

    uploaded_file = request.FILES.get('file')
    source_type = request.data.get('source_type')

    # Validate file

    if uploaded_file is None:

        return Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate source type

    if source_type not in ['sap', 'utility', 'travel']:

        return Response(
            {"error": "Invalid source_type"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create/Get tenant

    tenant, _ = Tenant.objects.get_or_create(
        name="Demo Company"
    )

    try:

        # Reset file pointer before reading

        uploaded_file.seek(0)

        # Read CSV

        df = pd.read_csv(uploaded_file)

        # Reset pointer again before saving

        uploaded_file.seek(0)

        # Save uploaded file

        UploadedFile.objects.create(
            tenant=tenant,
            source_type=source_type,
            file=uploaded_file
        )

        created_records = []

        # Process rows

        for _, row in df.iterrows():

            suspicious = False
            value = 0
            unit = "unknown"

            # SAP

            if source_type == "sap":

                value = float(row.get("Quantity", 0))
                unit = row.get("Unit", "L")

                if value > 50000:
                    suspicious = True

            # UTILITY

            elif source_type == "utility":

                value = float(row.get("Consumption", 0))
                unit = row.get("Unit", "kWh")

                if value > 100000:
                    suspicious = True

            # TRAVEL

            elif source_type == "travel":

                value = float(row.get("Distance", 1000))
                unit = "km"

                if value > 5000:
                    suspicious = True

            # Create emission record

            record = EmissionRecord.objects.create(

                tenant=tenant,
                source_type=source_type,

                raw_data=row.to_dict(),

                normalized_value=value,
                normalized_unit=unit,

                category=source_type,

                suspicious=suspicious
            )

            created_records.append(record.id)

        return Response({

            "message": "File uploaded successfully",
            "records_created": len(created_records)

        })

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by('-id')

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)
# MODEL.md

## Data Model

The system uses three primary models:

### Tenant

Represents a client company.

Fields:
- id
- name

Purpose:
Supports multi-tenancy so multiple enterprise clients can be onboarded independently.

---

### UploadedFile

Tracks uploaded source files.

Fields:
- tenant
- source_type
- file
- uploaded_at

Purpose:
Provides source-of-truth tracking and auditability for uploaded data.

---

### EmissionRecord

Stores normalized emissions/activity data.

Fields:
- tenant
- source_type
- raw_data
- normalized_value
- normalized_unit
- category
- suspicious
- approved
- approved_by
- approved_at
- edited
- edited_at
- locked_for_audit
- imported_at

Purpose:
Represents normalized ESG activity records ready for analyst review and audit workflows.

---

## Scope Categorization

### Scope 1
Fuel combustion from SAP fuel records.

### Scope 2
Electricity consumption from utility data.

### Scope 3
Business travel emissions.

---

## Source-of-Truth Tracking

Each record tracks:
- source type
- original uploaded file
- import timestamp
- edit status
- approval status

---

## Unit Normalization

Examples:
- fuel → liters
- electricity → kWh
- travel → km

This allows downstream emissions calculations.

---

## Audit Trail

Audit readiness is supported through:
- uploaded file tracking
- imported timestamps
- approval flags
- locked_for_audit status
- suspicious detection
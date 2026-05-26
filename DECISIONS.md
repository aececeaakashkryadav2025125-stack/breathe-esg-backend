# DECISIONS.md

## Backend Choice

Django REST Framework was chosen because:
- rapid API development
- strong admin support
- built-in ORM
- easy audit workflows

---

## Frontend Choice

React + Vite was selected because:
- lightweight frontend setup
- fast development
- component-based UI

---

## Database Choice

SQLite was used for prototype simplicity and rapid setup.

In production:
- PostgreSQL would be preferred.

---

## SAP Ingestion

Chosen format:
- flat CSV export

Reason:
Most realistic for rapid prototype ingestion.

Handled:
- Quantity
- Unit
- inconsistent values

Ignored:
- full IDoc complexity
- ERP integrations
- multilingual mappings

---

## Utility Data

Chosen format:
- CSV export

Reason:
Facilities teams commonly export portal CSVs.

Handled:
- consumption
- units
- billing values

Ignored:
- tariff complexity
- peak/off-peak pricing

---

## Travel Data

Chosen format:
- simplified CSV

Handled:
- distance values
- transport normalization

Ignored:
- airport code calculations
- emission factor engines

---

## Suspicious Detection

Thresholds:
- SAP > 50000
- Utility > 100000
- Travel > 5000

Used for analyst review prioritization.
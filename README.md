# Breathe ESG Backend

Backend system for ESG emissions ingestion built using Django and Django REST Framework.

---

## Features

- CSV upload API
- SAP ingestion support
- Utility ingestion support
- Travel ingestion support
- Suspicious emissions detection
- Django admin panel
- SQLite database
- REST API architecture

---

## Tech Stack

- Python
- Django
- Django REST Framework
- Pandas
- SQLite

---

## Project Structure

backend/
│
├── config/
├── ingestion/
├── sample-data/
├── media/
├── manage.py
├── requirements.txt
└── README.md

---

## API Endpoint

POST:

```text
/api/upload/
```

### Form Data

| Key         | Value Example |
|------------|---------------|
| source_type | sap |
| file | csv file |

---

## Supported Sources

### SAP

Expected columns:

- Quantity
- Unit

### Utility

Expected columns:

- Consumption
- Unit

### Travel

Dummy ingestion supported.

---

## Suspicious Detection Logic

| Source | Condition |
|--------|-----------|
| SAP | Quantity > 50000 |
| Utility | Consumption > 100000 |

---

## Run Locally

### 1. Clone repository

```bash
git clone <repo-url>
```

### 2. Enter project

```bash
cd backend
```

### 3. Create virtual environment

```bash
python -m venv venv
```

### 4. Activate environment

Windows:

```bash
venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run migrations

```bash
python manage.py migrate
```

### 7. Start server

```bash
python manage.py runserver
```

---

## Admin Panel

```text
http://127.0.0.1:8000/admin/
```

---

## Sample CURL Commands

### SAP

```bash
curl.exe -X POST "http://127.0.0.1:8000/api/upload/" -F "source_type=sap" -F "file=@sample-data/sap.csv"
```

### Utility

```bash
curl.exe -X POST "http://127.0.0.1:8000/api/upload/" -F "source_type=utility" -F "file=@sample-data/utility.csv"
```

### Travel

```bash
curl.exe -X POST "http://127.0.0.1:8000/api/upload/" -F "source_type=travel" -F "file=@sample-data/travel.csv"
```

---

## Author

Aakash Kumar Yadav
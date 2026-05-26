# Breathe ESG Dashboard

A full-stack ESG emissions ingestion dashboard.

---

## Features

- Upload CSV files
- Parse SAP data
- Parse Utility data
- Parse Travel data
- Detect suspicious records
- Store emissions in SQLite
- Django REST API
- React frontend dashboard

---

## Tech Stack

### Backend

- Django
- Django REST Framework
- SQLite
- Pandas

### Frontend

- React
- Vite
- Axios

---

## Backend Setup

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Upload CSV

POST:

```text
/api/upload/
```

### Get Records

GET:

```text
/api/records/
```

---

## Sample CSV Files

Located in:

```text
backend/sample-data/
```

---

## Suspicious Detection Rules

- SAP > 50000
- Utility > 100000
- Travel > 5000

---

## Author

Aakash Kumar Yadav
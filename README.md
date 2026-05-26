# Breathe ESG Dashboard

A full-stack ESG emissions ingestion and analyst review platform built using Django REST Framework and React.

This project simulates realistic ESG workflows for enterprise sustainability reporting by ingesting emissions-related data from multiple business systems, normalizing records, detecting suspicious entries, and enabling analyst review before audit approval.

---

# Live Deployment

## Frontend
https://breathe-esg-frontend-smoky.vercel.app

## Backend
https://breathe-esg-backend-itnd.onrender.com

## Admin Panel
https://breathe-esg-backend-itnd.onrender.com/admin/

### Credentials
Username: admin  
Password: admin123

---

# Features

## ESG Data Ingestion

Supports ingestion workflows for:
- SAP fuel and procurement exports
- Utility electricity billing data
- Corporate travel emissions data

---

## Analyst Review Dashboard

Includes:
- ESG analyst review queue
- Scope 1 / 2 / 3 classification
- Suspicious record detection
- Approval and rejection workflow
- Audit activity feed

---

## Suspicious Record Detection

| Source | Rule |
|---|---|
| SAP | Value > 50000 |
| Utility | Value > 100000 |
| Travel | Value > 5000 |

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite
- Pandas

## Frontend
- React
- Vite
- Axios

## Deployment
- Render
- Vercel

---

# API Endpoints

## Upload ESG Data

```http
POST /api/upload/
```

## Fetch Records

```http
GET /api/records/
```

---

# Project Structure

```plaintext
backend/
│
├── frontend/
├── ingestion/
├── sample-data/
│
├── MODEL.md
├── DECISIONS.md
├── TRADEOFFS.md
├── SOURCES.md
│
├── manage.py
└── requirements.txt
```

---

# Required Assignment Documents

## MODEL.md
Explains:
- data model
- normalization logic
- audit trail
- multi-tenancy

## DECISIONS.md
Documents:
- source format choices
- architecture decisions
- ingestion assumptions

## TRADEOFFS.md
Documents intentionally excluded features.

## SOURCES.md
Documents:
- SAP export research
- utility billing assumptions
- travel platform research

---

# Local Development

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Author

Aakash Kumar Yadav
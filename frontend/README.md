# Breathe ESG Tech Intern Assignment

Enterprise ESG ingestion and analyst review platform built using Django REST Framework and React.

This project simulates realistic ESG data ingestion workflows for:
- SAP fuel and procurement exports
- Utility electricity billing data
- Corporate travel emissions data

The platform normalizes incoming records, flags suspicious data, and provides analyst review workflows with audit visibility.

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
- SAP exports
- Utility electricity data
- Corporate travel data

---

## Analyst Review Workflow
- Review incoming ESG records
- Approve or reject suspicious entries
- Track Scope 1, 2, and 3 emissions
- Visual review queue for analysts

---

## Suspicious Record Detection
Flags:
- Negative electricity usage
- Missing airport codes
- Unit inconsistencies
- Invalid emission values

---

## Audit Visibility
Includes:
- Upload activity tracking
- Review activity feed
- Approval lifecycle visibility
- Source tracking simulation

---

# Tech Stack

## Frontend
- React
- Vite
- CSS
- Axios

## Backend
- Django
- Django REST Framework
- SQLite

## Deployment
- Frontend: Vercel
- Backend: Render

---

# Project Structure

```plaintext
backend/
│
├── frontend/
│
├── ingestion/
│
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
- multi-tenancy
- audit structure
- ESG normalization logic

## DECISIONS.md
Explains:
- ingestion assumptions
- architectural decisions
- realistic source handling choices

## TRADEOFFS.md
Documents intentionally excluded features and engineering tradeoffs.

## SOURCES.md
Documents:
- SAP export research
- utility data assumptions
- travel platform research
- real-world limitations

---

# ESG Scope Coverage

| Source | ESG Scope |
|---|---|
| SAP Fuel Data | Scope 1 |
| Utility Electricity | Scope 2 |
| Corporate Travel | Scope 3 |

---

# Screenshots

## Dashboard
(Add screenshot here)

## Review Queue
(Add screenshot here)

## Upload Workflow
(Add screenshot here)

## Audit Feed
(Add screenshot here)

---

# Local Development Setup

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Integration

Frontend connects to deployed Django REST APIs using Axios.

Example endpoints:
- `/api/records/`
- `/api/upload/`

---

# Future Improvements

Potential production improvements:
- authentication and RBAC
- advanced anomaly detection
- CSV preview and validation
- asynchronous ingestion jobs
- scalable PostgreSQL deployment
- persistent audit event logging

---

# Assignment Notes

This prototype prioritizes:
- realistic ESG workflows
- analyst usability
- audit visibility
- engineering reasoning
- operational review processes

over excessive feature complexity.

---

# Author

Aakash Kumar Yadav
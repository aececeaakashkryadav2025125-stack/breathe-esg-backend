# Breathe ESG Backend

Django backend for ESG emissions ingestion.

## Features

- CSV upload API
- SAP / Utility / Travel ingestion
- Suspicious emissions detection
- Django admin panel
- SQLite database
- REST API support

## Tech Stack

- Django
- Django REST Framework
- Pandas
- SQLite

## Run Project

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# AgriRent AI

## Project layout

- `backend/` — Flask application and Python modules
- `frontend/templates/` — Jinja templates
- `frontend/static/` — CSS, JavaScript, images, and uploaded files
- `frontend/translations/` — language JSON files
- `database/` — SQLite database and runtime data
- `AgriRent_app.py` — local development entry point
- `wsgi.py` — WSGI entry point for hosting

## Run locally

Install dependencies, then start the development server:

```powershell
python -m pip install -r requirements.txt
python AgriRent_app.py
```

The app listens at `http://127.0.0.1:5000`.

## Host with a WSGI server

Install dependencies, then start the WSGI server:

```powershell
python -m pip install -r requirements.txt
waitress-serve --host=0.0.0.0 wsgi:app
```

Set a strong `SECRET_KEY` in the host's environment. Do not use the development
fallback in a public deployment. Set `FLASK_DEBUG=false` for production.

The default SQLite database is `database/AgriRent_ai.db`. Configure
`AGRIRENT_DATA_DIR` to a persistent writable directory on the host, or set
`AGRIRENT_DATABASE_PATH` to an absolute database file path. Keep the database
and `frontend/static/uploads/` on persistent storage and include them in
backups. SQLite is suitable for a single application instance; use a
server-managed database for multi-instance deployments.

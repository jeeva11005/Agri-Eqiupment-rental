import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"
STATIC_DIR = FRONTEND_DIR / "static"
TEMPLATES_DIR = FRONTEND_DIR / "templates"
TRANSLATIONS_DIR = FRONTEND_DIR / "translations"
_data_dir = Path(os.environ.get("AGRIRENT_DATA_DIR", str(PROJECT_ROOT / "database")))
DATABASE_DIR = _data_dir if _data_dir.is_absolute() else PROJECT_ROOT / _data_dir

_database_path = Path(
    os.environ.get("AGRIRENT_DATABASE_PATH", str(DATABASE_DIR / "AgriRent_ai.db"))
)
DATABASE_PATH = (
    _database_path if _database_path.is_absolute() else PROJECT_ROOT / _database_path
)

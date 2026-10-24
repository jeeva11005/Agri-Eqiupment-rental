import os
from .paths import DATABASE_PATH

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "")
DATABASE_URL = os.environ.get(
    "DATABASE_URL", f"sqlite:///{DATABASE_PATH.as_posix()}"
)
SECRET_KEY = os.environ.get("SECRET_KEY", "development-only-change-me")
DEBUG = os.environ.get("FLASK_DEBUG", "").lower() == "true"

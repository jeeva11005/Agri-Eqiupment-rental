import os
import json
from .paths import DATABASE_DIR

# Booking and payment management functions
def load_bookings():
    bookings_path = DATABASE_DIR / 'bookings.json'
    if bookings_path.exists():
        with open(bookings_path, 'r') as f:
            return json.load(f)
    return {}

def save_bookings(bookings):
    DATABASE_DIR.mkdir(parents=True, exist_ok=True)
    with open(DATABASE_DIR / 'bookings.json', 'w') as f:
        json.dump(bookings, f, indent=2)

def get_equipment_price(equipment_name):
    """Get hourly price for equipment"""
    equipment_map = {
        'tractor': 200,
        'mini tractor': 200,
        'seed drill': 100,
        'harvester': 250,
        'sprayer': 80,
        'cultivator': 130,
        'thresher': 150
    }
    return equipment_map.get(equipment_name.lower(), 150)
import os

from backend.AgriRent_app import app, initialize_database


if __name__ == '__main__':
    initialize_database()
    from backend.demand_prediction import warmup

    warmup()
    app.run(debug=os.environ.get('FLASK_DEBUG', '').lower() == 'true')

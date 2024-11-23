from flask import Flask
from models import db
from routes import register_blueprints

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

register_blueprints(app)

if __name__ == '__main__':
    app.run(debug=True)

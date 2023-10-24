import os
from flask import Flask, render_template, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models import db
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

app.config.from_object(Config)

@app.route("/")
def hello():
    return "Hello Team 8! testing!"

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')
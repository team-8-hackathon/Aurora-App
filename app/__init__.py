import os
from flask import Flask, render_template, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models.db import db
from .config import Config

app = Flask(__name__)

app.config.from_object(Config)

@app.route("/")
def hello():
    return "Hello Team 8! testing"

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

import os
from flask import Flask, request, session, redirect
# from flask_login import LoginManager
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_wtf.csrf import CSRFProtect, generate_csrf
# from .seeds import seed_commands
# from .models import db, Admin
# from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')


# # Setup login manager
# login = LoginManager(app)
# login.login_view = 'auth.unauthorized'


# @login.user_loader
# def load_user(id):
#     return Admin.query.get(int(id))

# # Tell flask about our seed commands
# app.cli.add_command(seed_commands)

# app.config.from_object(Config)

@app.route("/")
def hello():
    return "Hello Team 8! testing!"

# db.init_app(app)
# Migrate(app, db)

# # Application Security
# CORS(app)


# #any request made with http is redirected to https
# @app.before_request
# def https_redirect():
#     if os.environ.get('FLASK_ENV') == 'production':
#         if request.headers.get('X-Forwarded-Proto') == 'http':
#             url = request.url.replace('http://', 'https://', 1)
#             code = 301
#             return redirect(url, code=code)


# @app.after_request
# def inject_csrf_token(response):
#     response.set_cookie(
#         'csrf_token',
#         generate_csrf(),
#         secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
#         samesite='Strict' if os.environ.get(
#             'FLASK_ENV') == 'production' else None,
#         httponly=True)
#     return response


# @app.route("/api/docs")
# def api_help():
#     """
#     Returns all API routes and their doc strings
#     """
#     acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
#     route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
#                     app.view_functions[rule.endpoint].__doc__ ]
#                     for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
#     return route_list


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def react_root(path):
#     """
#     This route will direct to the public directory in our
#     react builds in the production environment for favicon
#     or index.html requests
#     """
#     if path == 'favicon.ico':
#         return app.send_from_directory('public', 'favicon.ico')
#     return app.send_static_file('index.html')


# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')
import os
from flask import Flask, request, session, redirect, send_from_directory
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .seeds import seed_commands
from .models import db, Admin
from .api.testimonial_routes import testimonial_routes
from .config import Config
from .api.subs_routes import subs_routes
from .api.topic_routes import topic_routes
from .api.blog_routes import blog_routes
from .api.auth_routes import auth_routes

if os.environ.get('FLASK_ENV') == 'production':
    app = Flask(__name__, static_folder='/var/www/app/static', static_url_path='')
else:
    app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
    
# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return Admin.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(testimonial_routes, url_prefix='/api/testimonial')
app.register_blueprint(topic_routes, url_prefix='/api/topics')
app.register_blueprint(blog_routes, url_prefix='/api/blogs')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(subs_routes, url_prefix='/api/subs')


db.init_app(app)
Migrate(app, db)

# Application Security
# CORS(app)
CORS(app, supports_credentials=True)



#any request made with http is redirected to https
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    csrf_token = generate_csrf()
    if os.environ.get('FLASK_ENV') == 'production':
        response.set_cookie(
            'csrf_token',
            csrf_token,
            secure=True,
            samesite='Strict',
            httponly=True
        )
    else:
        response.set_cookie('csrf_token', csrf_token)
    return response



@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):

    separated_path = path.split('/')[-1]


    print("********************************", separated_path)
    if path == 'favicon.ico':
        return send_from_directory(app.static_folder, 'favicon.ico')


    elif path.startswith('static/'):
        return send_from_directory(app.static_folder, path)


    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
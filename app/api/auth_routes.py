from flask import Blueprint, jsonify, session, request
from app.models import Admin, db
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    print("hello its me")
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['GET'])
def login2():
    print("this is awesome")

    return {'errors': "hellooooooooooooo"}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    print("HI")
    form['csrf_token'].data = request.cookies['csrf_token']
    print("auth_route")
    if form.validate_on_submit():
        print("if_form.validate_auth_route")
        # Add the user to the session, we are logged in!
        admin = Admin.query.filter(Admin.username == form.data['username']).first()
        login_user(admin)
        print("loggedin", current_user)
        return admin.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

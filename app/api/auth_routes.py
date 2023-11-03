from flask import Blueprint, jsonify, session, request
from app.models import Admin, db
from app.forms import LoginForm, AdminForm, EditPassword
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

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
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        admin = Admin.query.filter(Admin.username == form.data['username']).first()
        login_user(admin)
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


@auth_routes.route('/admins')
@login_required
def get_admins():
    """
    Returns a list of admin accounts (usernames only)
    """

    admins = Admin.query.all()

    return {'admins': [admin.to_dict() for admin in admins]}

@auth_routes.route('/update-password', methods=['PUT'])
@login_required
def change_password():
    """
    Route to update the current user's password
    """
    admin = Admin.query.get(current_user.id)
    if not admin:
        return {"errors", "Admin not found"}, 404
    form = EditPassword()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        password = form.data['password']
        admin.password = password
        admin.updated_at = datetime.now()
        db.session.commit()
        return admin.to_dict()
    return {'errors', validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/add-admin', methods=["POST"])
@login_required
def add_admin():
    """
    Route to add an administrative account, only current admins can create accounts
    """
    form = AdminForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        username = form.data['username']
        password = form.data['password']

        admin = Admin(username=username, password=password)
        db.session.add(admin)
        db.session.commit()
        return admin.to_dict()
    return {'errors', validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/<int:id>/delete_admin', methods=['DELETE'])
@login_required
def delete_admin(id):
    """
    Route to delete an admin, can only delete the current user
    """

    admin = Admin.query.get(id)
    if not admin:
        return {'errors', 'Admin account not found'}, 404
    elif admin.id != current_user.id:
        return {'errors', 'Not your account'}, 403
    db.session.delete(admin)
    db.session.commit()
    return {'message', f'Admin id {id}, successfully deleted'}, 
    




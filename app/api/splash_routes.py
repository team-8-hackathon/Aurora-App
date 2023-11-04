from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import SplashParagraphForm
from app.models import SplashParagraph, db
from app.api.auth_routes import validation_errors_to_error_messages

splash_routes = Blueprint('splash', __name__)

#Get all splash paragraphs
@splash_routes.route('/')
def get_all_splash():
    """
    Get all splash paragraphs
    """
    splashes = SplashParagraph.query.all()

    return {'paragraphs': [splash.to_dict() for splash in splashes]}

#edit a splash paragraph by its id
@splash_routes.route('/<int:id>/edit', methods=["PATCH"])
@login_required
def edit_splash(id):
    """
    Edit a splash paragraph's header and paragraph by id
    """

    splash = SplashParagraph.query.get(id)
    if not splash:
        return {"errors", "splash paragraph not found"}, 404
    form = SplashParagraphForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['header']:
            splash.header = form.data['header']
        if form.data['paragraph']:
            splash.paragraph = form.data['paragraph']
        db.session.commit()
        return splash.to_dict()
    return {"errors", validation_errors_to_error_messages(form.errors)}

#get a splash section by id
splash_routes.route('/<int:id>')
def get_single_splash(id):
    """
    Query to get a splash paragraph entry by its id
    """
    splash = SplashParagraph.query.get(id)
    if not splash:
        return {"errors", "splash paragraph not found"}, 404
    return splash.to_dict()

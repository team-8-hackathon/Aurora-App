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

    return {"paragraphs": [splash.to_dict() for splash in splashes]}

@splash_routes.route('/<int:id>', methods=['GET'])
def get_single_splash(id):
    """
    Get a splash paragraph by its id
    """
    splash = SplashParagraph.query.get(id)
    if not splash:
        return {"errors", "Splash paragraph not found"}, 404
    return splash.to_dict()

#Edit splash page paragraphs
@splash_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_splash_page(id):
    """
    Update Splash Page Paragraphs
    """
    section = SplashParagraph.query.get(id)
    if not section:
        return {"errors": "Paragraph not found"}, 404

    form = SplashParagraphForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.data['title']
        header = form.data['header']
        paragraph = form.data['paragraph']

        section.title = title
        section.header = header
        section.paragraph = paragraph

        db.session.commit()
        return section.to_dict()

    return {'errors': form.errors}, 401

@splash_routes.route('/create', methods=['POST'])
@login_required
def create_splash_page():
    """
    Create a new splash page paragraph
    """

    form = SplashParagraphForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.data['title']
        header = form.data['header']
        paragraph = form.data['paragraph']

        splash_paragraph = SplashParagraph(title=title, header=header, paragraph=paragraph)

        db.session.add(splash_paragraph)
        db.session.commit()
    print('*****************', form.data)
    return {'errors': form.errors}, 401

@splash_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_splash(id):
    """
    Delete a splash paragraph by its id
    """

    splash = SplashParagraph.query.get(id)
    if not splash:
        return {"errors": "Splash paragraph not found"}, 404
    return splash.to_dict()
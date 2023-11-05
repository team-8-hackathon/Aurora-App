from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import SplashParagraphForm
from app.models import SplashParagraph, db

splash_routes = Blueprint('splash', __name__)

#Get all splash paragraphs
@splash_routes.route('/')
def get_all_splash():
    """
    Get all splash paragraphs
    """
    splashes = SplashParagraph.query.all()

    return [splash.to_dict() for splash in splashes]


#Edit splash page paragraphs
@splash_routes.route('/<int:id>', methods=['PUT'])
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

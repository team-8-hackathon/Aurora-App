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
@splash_routes.route('/<int:splashId>', methods=['PUT'])
def edit_splash_page(splashId):
    """
    Update Splash Page Paragraphs
    """
    splash = SplashParagraph.query.get(splashId)
    data = request.get_json()

    if splash:
        splash.title = data['title']
        splash.header = data['header']
        splash.paragraph = data['paragraph']

        db.session.commit()
        return splash.to_dict()
    return {"Message": 'Not updated'}

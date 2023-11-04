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

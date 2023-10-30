from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import SubsForm
# from app.models import Subs, db
from app.mailchimp_api import get_subscribers

subs_routes = Blueprint('subs', __name__)

#Get all Subs
@subs_routes.route('/')
@login_required
def get_all_subs():
    api_key = "4713cf3d0425545b46efab9926bdae70-us21"
    server_prefix = "us21"
    list_id = "8b0b556b44"
    # Subs = Subs.query.order_by(Subs.created_at.desc()).all()
    Subs = get_subscribers(api_key, server_prefix, list_id);

    return Subs



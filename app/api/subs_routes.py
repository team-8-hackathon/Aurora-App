from flask import Blueprint, request
from flask_login import login_required, current_user
import os
from app.mailchimp_api import get_subscribers

subs_routes = Blueprint('subs', __name__)

API_KEY = os.environ.get("API_KEY")
SERVER_PREFIX = os.environ.get("SERVER_PREFIX")
LIST_ID = os.environ.get("LIST_ID")

#Get all Subs
@subs_routes.route('/')
@login_required
def get_all_subs():
    Subs = get_subscribers(API_KEY, SERVER_PREFIX, LIST_ID);
    return Subs



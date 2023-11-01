from flask import Blueprint, request
from flask_login import login_required, current_user
import os
import random
from app.mailchimp_api import get_subscribers
from app.mailchimp_api import delete_subscriber


subs_routes = Blueprint('subs', __name__)

# api_keys = [
#     os.environ.get('MC_KEY1'),
#     os.environ.get('MC_KEY2'),
#     os.environ.get('MC_KEY3'),
#     os.environ.get('MC_KEY4'),
#     os.environ.get('MC_KEY5')
# ]

SERVER_PREFIX = os.environ.get("SERVER_PREFIX")
LIST_ID = os.environ.get("LIST_ID")

#Get all subscribers
@subs_routes.route('/')
@login_required
def get_all_subs():
    # selected_key = random.choice(api_keys)
    API_KEY = os.environ.get('MC_KEY')
    Subs = get_subscribers(API_KEY, SERVER_PREFIX, LIST_ID);
    return Subs

#Delete a subscriber
@subs_routes.route('/<string:id>/delete', methods=['DELETE'])
@login_required
def delete_a_subscriber(id):
    # selected_key = random.choice(api_keys)
    API_KEY = os.environ.get('MC_KEY')
    delete_subscriber(API_KEY, SERVER_PREFIX, LIST_ID, id)
    return {"message": f'sub id: {id} was deleted'}

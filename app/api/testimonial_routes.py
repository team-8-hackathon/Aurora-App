from flask import Blueprint, request, jsonify
from app.models import Testimonial, db
from app.forms import TestimonialForm


testimonial_routes = Blueprint('testimonial', __name__)

@testimonial_routes.route('/')
def hello():
    return "Testimonial route"


@testimonial_routes.route('/new', methods=["POST"])
def create_testimonial():
  """
  Create a new testimonial
  """
  form = TestimonialForm()
  if form.validate_on_submit():
    name = form.data['name']
    profile_pic = form.data['profile_pic']
    stars = form.data['stars']
    body = form.data['body']

    testimonial = Testimonial(name=name, stars=stars, body=body, profile_pic=profile_pic)
    db.session.add(testimonial)
    db.session.commit()

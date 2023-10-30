from flask import Blueprint, request, jsonify
from app.models import Testimonial, db
from app.forms import TestimonialForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


testimonial_routes = Blueprint('testimonial', __name__)

@testimonial_routes.route('/')
def get_testimonials():
     testimonials = Testimonial.query.order_by(Testimonial.stars.desc()).all()
     testimonials = testimonials[0:4]
     return {'testimonials': [testimonial.to_dict() for testimonial in testimonials]}, 201



@testimonial_routes.route('/new', methods=["POST"])
def create_testimonial():
  """
  Create a new testimonial
  """
  form = TestimonialForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    name = form.data['name']
    if form.data['profile_pic']:
      profile_pic = form.data['profile_pic']
      profile_pic.filename = get_unique_filename(profile_pic.filename)
      upload = upload_file_to_s3(profile_pic)
      if 'url' not in upload:
         return {"errors": upload}
      url = str(upload['url'])
    stars = form.data['stars']
    body = form.data['body']

    testimonial = Testimonial(name=name, stars=stars, body=body, profile_pic=url)
    db.session.add(testimonial)
    db.session.commit()
    print('----------Testimonial Saved')
    testimonials = Testimonial.query.order_by(Testimonial.stars.desc()).all()
    return {'testimonials': [testimonial.to_dict() for testimonial in testimonials]}, 201
    # return testimonial.to_dict(), 201

  return {"ERRORS ": validation_errors_to_error_messages(form.errors)}, 401

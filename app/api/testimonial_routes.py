from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Testimonial, db
from app.forms import TestimonialForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


testimonial_routes = Blueprint('testimonial', __name__)

@testimonial_routes.route('/')
def get_testimonials():
     testimonials = Testimonial.query.order_by(Testimonial.stars.desc()).all()
    #  testimonials = testimonials[0:4]
     return {'testimonials': [testimonial.to_dict() for testimonial in testimonials]}, 201



@testimonial_routes.route('/new', methods=["POST"])
def create_testimonial():
  """
  Create a new testimonial
  """
  form = TestimonialForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    first_name = form.data['first_name']
    last_name = form.data['last_name']
    stars = form.data['stars']
    body = form.data['body']
    if form.data['profile_pic']:
      profile_pic = form.data['profile_pic']
      profile_pic.filename = get_unique_filename(profile_pic.filename)
      upload = upload_file_to_s3(profile_pic)
      if 'url' not in upload:
         return {"errors": upload}
      url = str(upload['url'])

      testimonial = Testimonial(first_name=first_name, last_name=last_name, stars=stars, body=body, profile_pic=url)
      db.session.add(testimonial)
      db.session.commit()
      return testimonial.to_dict(), 201
    testimonial = Testimonial(first_name=first_name, last_name=last_name, stars=stars, body=body)
    db.session.add(testimonial)
    db.session.commit()
    return testimonial.to_dict(), 201
    # return testimonial.to_dict(), 201

  return {"ERRORS ": validation_errors_to_error_messages(form.errors)}, 401


@testimonial_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_testimonial(id):
    """
    Delete a tesimonial post by its id
    """
    testimonial = Testimonial.query.get(id)
    if not testimonial:
       return {"ERROR": 'Testimonial not found'}, 404
    
    remove_file_from_s3(testimonial.profile_pic)

    db.session.delete(testimonial)
    db.session.commit()

    return {"message": f'testimonial id: {testimonial.id} was deleted'}

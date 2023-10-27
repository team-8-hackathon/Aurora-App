from flask import Blueprint, request
from flask_login import login_required, current_user
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
# from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import SubsForm
from app.models import Subs, db
from datetime import datetime

Subs_routes = Blueprint('Subs', __name__)

#Get all Subs
@Subs_routes.route('/')
def get_all_Subs():
    """
    Get all Subs
    """
    Subs = Subs.query.order_by(Subs.created_at.desc()).all()

    return {'Subs': [Subs.to_dict() for Subs in Subs]}


#Get a Subs by id
@Subs_routes.route('/<int:id>')
def get_Subs_id(id):
    """
    Get a Subs by its id
    """
    Subs = Subs.query.get(id)
    if not Subs:
        return {"errors": "Subs not found"}, 404

    return Subs.to_dict()

#Post Subs
@Subs_routes.route('/create', methods=["POST"])
@login_required
def post_Subs():
    """
    Route to create a new Subs post
    """
    form = SubsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.data['title']
        body = form.data['body']
        thumbnail = form.data['thumbnail']
        thumbnail.filename = get_unique_filename(thumbnail.filename)
        upload = upload_file_to_s3(thumbnail)

        if 'url' not in upload:
            return {"errors": upload}
        url = str(upload['url'])

        Subs = Subs(title=title, thumbnail=url, body=body)

        db.session.add(Subs)
        db.session.commit()
        return Subs.to_dict()
    return {'errors': form.errors}, 401


#delete a Subs post
@Subs_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_Subs(id):
    """
    Delete a Subs post by its id
    """

    Subs = Subs.query.get(id)
    if not Subs:
        return {"errors": "Subs not found"}, 404
    
    remove_file_from_s3(Subs.thumbnail)

    db.session.delete(Subs)
    db.session.commit()

    return {"message": f'Subs id: {Subs.id} was deleted'}

#edit a Subs
@Subs_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_Subs(id):
    """
    Edit a Subs post by its id
    """
    Subs = Subs.query.get(id)
    if not Subs:
        return {"errors": "Subs not found"}, 404
    
    form = SubsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.data['title']
        body = form.data['body']

        if form.data['thumbnail']:
            thumbnail = form.data['thumbnail']
            thumbnail.filename = get_unique_filename(thumbnail.filename)
            upload = upload_file_to_s3(thumbnail)
            
            if 'url' not in upload:
                return {"errors": upload}
            url = str(upload['url'])
            remove_file_from_s3(Subs.thumbnail)

        Subs.title = title
        Subs.body = body
        Subs.thumbnail = thumbnail
        Subs.updated_at = datetime.now()
        db.session.commit()

        return Subs.to_dict()
    return {'errors': form.errors}, 401

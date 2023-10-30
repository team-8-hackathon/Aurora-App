from flask import Blueprint, request
from flask_login import login_required, current_user
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
# from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import BlogForm, EditBlogForm
from app.models import Blog, db, Topic
from datetime import datetime

blog_routes = Blueprint('blogs', __name__)

#Get all blogs
@blog_routes.route('/')
def get_all_blogs():
    """
    Get all blogs
    """
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()

    return {'blogs': [blog.to_dict() for blog in blogs]}


#Get a blog by id
@blog_routes.route('/<int:id>')
def get_blog_id(id):
    """
    Get a blog by its id
    """
    blog = Blog.query.get(id)
    if not blog:
        return {"errors": "Blog not found"}, 404

    return blog.to_dict()

#Post Blog
@blog_routes.route('/create', methods=["POST"])
@login_required
def post_blog():
    """
    Route to create a new blog post
    """
    form = BlogForm()
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

        blog = Blog(title=title, thumbnail=url, body=body)
        topic = Topic.query.get(form.data['topic'])

        db.session.add(blog)
        db.session.commit()
        blog.topics.append(topic)
        db.session.commit()
        return blog.to_dict()
    return {'errors': form.errors}, 401


#delete a blog post
@blog_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_blog(id):
    """
    Delete a blog post by its id
    """

    blog = Blog.query.get(id)
    if not blog:
        return {"errors": "Blog not found"}, 404
    
    remove_file_from_s3(blog.thumbnail)

    db.session.delete(blog)
    db.session.commit()

    return {"message": f'blog id: {blog.id} was deleted'}

#edit a blog
@blog_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_blog(id):
    """
    Edit a blog post by its id
    """

    blog = Blog.query.get(id)
    if not blog:
        return {"errors": "Blog not found"}, 404
    
    form = EditBlogForm()
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
            remove_file_from_s3(blog.thumbnail)
            blog.thumbnail = url
        if form.data['topic']:
            oldTopic = blog.topics[0]
            newTopic = Topic.query.get(form.data['topic'])
            if oldTopic.id != newTopic.id:
                blog.topics.remove(oldTopic)
                blog.topics.append(newTopic)

        blog.title = title
        blog.body = body
        blog.updated_at = datetime.now()
        db.session.commit()
        return blog.to_dict()
    return {'errors': form.errors}, 401

from flask import Blueprint, request
from flask_login import login_required, current_user
# from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import TopicForm 
from app.models import Topic, blog_topics, Blog, db
from datetime import datetime

topic_routes = Blueprint('topics', __name__)


#Get blogs by topic
@topic_routes.route('/<int:topic_id>/blogs', methods=['GET'])
def get_blogs_by_topic(topic_id):
    """
    Fetch all blogs related to a particular topic
    """
    blogs_for_topic = db.session.query(Blog).\
        join(blog_topics, Blog.id == blog_topics.c.blog_id).\
        join(Topic, blog_topics.c.topic_id == Topic.id).\
        filter(Topic.id == topic_id).all()

    return {'blogs': [blog.to_dict() for blog in blogs_for_topic]}

#Get all topics
@topic_routes.route('/', methods=['GET'])
def get_all_topics():
    """
    Get all topics
    """
    topics = Topic.query.order_by(Topic.topic.asc()).all()

    return {'topics': [topic.to_dict() for topic in topics]}

#get a topic by id
@topic_routes.route('/<int:id>')
def get_topic_by_id(id):
    """
    Get a topic by its id
    """
    topic = Topic.query.get(id)
    if not topic:
        return {"errors": "Topic not found"}, 404

    return topic.to_dict()

#Post Topic
@topic_routes.route('/create', methods=["POST"])
# @login_required
def post_topic():
    """
    Route to create a new topic
    """
    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        topic = form.data['topic']

        topic = Topic(topic=topic) 

        db.session.add(topic)
        db.session.commit()
        return topic.to_dict()
    return {'errors': form.errors}, 401

#delete a topic
@topic_routes.route('/<int:id>/delete', methods=['DELETE'])
# @login_required
def delete_topic(id):
    """
    Delete a topic by its id
    """

    topic = Topic.query.get(id)
    if not topic:
        return {"errors": "Topic not found"}, 404

    db.session.delete(topic)
    db.session.commit()

    return {"message": f'topic id: {topic.id} was deleted'}

#edit a topic
@topic_routes.route('/<int:id>/edit', methods=["PUT"])
# @login_required
def edit_topic(id):
    """
    Edit a topic by its id
    """
    topic = Topic.query.get(id)
    if not topic:
        return {"errors": "Topic not found"}, 404
    
    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        topic_name = form.data['topic']

        topic.topic = topic_name
        topic.updated_at = datetime.now()  

        db.session.commit()

        return topic.to_dict()

    return {'errors': form.errors}, 401

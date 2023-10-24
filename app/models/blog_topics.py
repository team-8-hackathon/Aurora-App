from .db import db, environment, SCHEMA,add_prefix_for_prod

blog_topics = db.Table(
    'blog_topics',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('blog_id', db.Integer, db.ForeignKey(add_prefix_for_prod('blogs.id'))),
    db.Column('topic_id', db.Integer, db.ForeignKey(add_prefix_for_prod('topics.id')))
)

if environment == "production":
    blog_topics.schema = SCHEMA
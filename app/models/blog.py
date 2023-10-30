from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Blog(db.Model):
    __tablename__ = "blogs"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    thumbnail=db.Column(db.String(1000), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    body = db.Column(db.String(10000), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)


    #define relationships through the join table blog_topics
    topics = db.relationship('Topic', back_populates='blogs')

    #helper func to convert instance to a dictionary
    def to_dict(self):
        return {
            'id': self.id,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'body': self.body,
            'topic_id': self.topic_id,
            'topic': self.topics.to_dict_no_blog(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_dict_no_topic(self):
        return {
            'id': self.id,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'body': self.body,
            'topic_id': self.topic_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
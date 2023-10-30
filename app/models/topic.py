from .db import db, environment, SCHEMA
from datetime import datetime

class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    topic = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(50), default="#ffe27a")
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    #define relationships through the join table blog_topics
    blogs = db.relationship('Blog', back_populates='topics', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'color': self.color,
            'blogs': [blog.to_dict_no_topic() for blog in self.blogs]
        }

    def to_dict_no_blog(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'color': self.color
        }
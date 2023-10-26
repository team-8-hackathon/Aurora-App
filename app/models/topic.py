from .db import db, environment, SCHEMA
from .blog_topics import blog_topics
from datetime import datetime

class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    topic = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    #define relationships through the join table blog_topics
    blogs = db.relationship('Blog', secondary=blog_topics, back_populates='topics')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic
        }


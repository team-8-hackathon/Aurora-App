from .db import db, environment, SCHEMA
from sqlalchemy.orm import validates
from datetime import datetime

class SplashParagraph(db.Model):
    __tablename__ = "splashparagraphs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    header = db.Column(db.String(250), nullable=False)
    paragraph = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'header': self.header,
            'paragraph': self.paragraph,
            'created_at': self.created_at
        }
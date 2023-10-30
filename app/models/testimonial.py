from .db import db, environment, SCHEMA
from sqlalchemy.orm import validates
from datetime import datetime

class Testimonial(db.Model):
    __tablename__ = 'testimonials'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    #add a default url to profile pics later
    profile_pic = db.Column(db.String(1000), default='/images/defaultUser.png')
    name = db.Column(db.String(200), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(1000), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)

    #validate stars is 1 - 5
    @validates('stars')
    def validate_stars(self, key, value):
        if not 1 <= value <= 5:
            raise ValueError(f'Invalid stars {value}')
        return value
    
    #helper func to convert class instance to dictionary
    def to_dict(self):
        return {
            'id': self.id,
            'profile_pic': self.profile_pic,
            'name': self.name,
            'stars': self.stars,
            'body': self.body,
            'created_at': self.created_at,
        }
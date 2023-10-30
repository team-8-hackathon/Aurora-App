from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class TestimonialForm(FlaskForm):
  profile_pic = StringField('profile_pic', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired()])
  stars = IntegerField('stars' ,validators=[DataRequired()])
  body = StringField('body', validators=[DataRequired()])
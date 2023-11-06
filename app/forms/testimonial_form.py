from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.aws_helpers import ALLOWED_EXTENSIONS

class TestimonialForm(FlaskForm):
  profile_pic = FileField('profile_pic', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  first_name = StringField('first_name', validators=[DataRequired()])
  last_name = StringField('last_name', validators=[DataRequired()])
  stars = IntegerField('stars' ,validators=[DataRequired()])
  body = StringField('body', validators=[DataRequired()])
  favorited = BooleanField('favorited')
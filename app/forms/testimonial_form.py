from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.aws_helpers import ALLOWED_EXTENSIONS

class TestimonialForm(FlaskForm):
  profile_pic = FileField('profile_pic', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  name = StringField('name', validators=[DataRequired()])
  stars = IntegerField('stars' ,validators=[DataRequired()])
  body = StringField('body', validators=[DataRequired()])
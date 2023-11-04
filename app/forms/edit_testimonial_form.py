from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.aws_helpers import ALLOWED_EXTENSIONS


class EditTestimonial(FlaskForm):
  favorited = BooleanField('favorited')
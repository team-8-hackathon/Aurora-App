from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS

class BlogForm(FlaskForm):
    thumbnail=FileField('thumbnail', validators=[FileRequired(), FileRequired(list(ALLOWED_EXTENSIONS))])
    title=StringField('title', validators=[(DataRequired())])
    body=StringField('body', validators=[DataRequired()])
    
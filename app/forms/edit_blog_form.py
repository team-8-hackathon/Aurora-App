from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.aws_helpers import ALLOWED_EXTENSIONS

class EditBlogForm(FlaskForm):
    thumbnail=FileField('thumbnail', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    title=StringField('title', validators=[(DataRequired())])
    body=StringField('body', validators=[DataRequired()])
    topic=IntegerField('topic', validators=[DataRequired()])
    
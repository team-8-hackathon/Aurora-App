from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
import re

def isHex(form, field):
    hex = field.data
    match = re.search(r'^#(?:[0-9a-fA-F]{3}){1,2}$', hex)

    if not match:
       raise ValidationError('Color is not a valid hex code')

class TopicForm(FlaskForm):
    topic = StringField('Topic Name', validators=[DataRequired()])
    color = StringField('color', validators=[isHex])
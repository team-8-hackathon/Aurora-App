from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditPassword(FlaskForm):
    password = StringField('password', validators=[DataRequired()])
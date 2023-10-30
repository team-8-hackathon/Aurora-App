from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class SubsForm(FlaskForm):
    email=StringField('email', validators=[DataRequired()])
    
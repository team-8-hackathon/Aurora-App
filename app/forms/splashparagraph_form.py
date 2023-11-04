from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class SplashParagraphForm(FlaskForm):
    paragraph = StringField('paragraph')
    header = StringField('header')
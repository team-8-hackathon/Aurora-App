from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class SplashParagraphForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    paragraph = StringField('paragraph', validators=[DataRequired()])
    header = StringField('header', validators=[DataRequired()])

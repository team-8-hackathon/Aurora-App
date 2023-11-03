from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class EditTestimonial(FlaskForm):
   favorite = BooleanField('favorite', validators=[DataRequired()])
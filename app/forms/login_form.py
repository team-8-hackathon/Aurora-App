from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Admin

def user_exists(form, field):
    #Checking if user exists
    username = field.data
    admin = Admin.query.filter(Admin.username == username).first()
    if not admin:
        raise ValidationError('Username provided not found')
    
def password_matches(form, field):
    password = field.data
    username = form.data['username']
    admin = Admin.query.filter(Admin.username == username).first()
    if not admin:
        raise ValidationError("No such user exists.")
    if not admin.check_password(password):
        raise ValidationError("Password was incorrect.")
    
class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Admin

def user_exists(form, field):
    #Checking if user exists
    print("user_exists",form.data)
    username = field.data
    admin = Admin.query.filter(Admin.username == username).first()
    if not admin:
        print("user_doesnt_exists",form.data)
        raise ValidationError('Username provided not found')
    
def password_matches(form, field):

    password = field.data
    username = form.data['username']
    admin = Admin.query.filter(Admin.username == username).first()
    if not admin:
        raise ValidationError("No such user exists.")
    if not admin.check_password(password):
        print("user_pass",field.data)
        raise ValidationError("Password was incorrect.")
    
class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Admin


def username_available(form, field):
    # Checking if admin exists
    username = field.data
    admin = Admin.query.filter(Admin.username == username).first()
    if admin:
        raise ValidationError('Username already taken')


class AdminForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_available])
    password = StringField('password', validators=[DataRequired()])

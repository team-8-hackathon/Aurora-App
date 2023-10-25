from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .admin import seed_admin, unseed_admin

seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        unseed_admin()
    seed_admin()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    unseed_admin()
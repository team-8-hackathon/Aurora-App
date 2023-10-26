from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .admin import seed_admin, unseed_admin
from .topic import seed_topics, unseed_topics

seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        unseed_admin()
        unseed_topics()
    seed_admin()
    seed_topics()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    unseed_admin()
    unseed_topics()




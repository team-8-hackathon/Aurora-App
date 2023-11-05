from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from .admin import seed_admin, unseed_admin
from .topic import seed_topics, unseed_topics
from .blog import seed_blog, unseed_blog
from .testimonial import seed_testimonials, unseed_testimonials
from .splashparagraph import seed_splashparagraphs, unseed_paragraphs

seed_commands = AppGroup('seed')


#create flask seed user command for testing with no data
@seed_commands.command('user')
def seed_user():
    seed_admin()

@seed_commands.command('test')
def seed_user():
    seed_testimonials()

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_admin()
    seed_topics()
    seed_blog()
    seed_testimonials()
    seed_splashparagraphs()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    unseed_admin()
    unseed_blog()
    unseed_topics()
    unseed_testimonials()
    unseed_paragraphs()

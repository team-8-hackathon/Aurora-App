from app.models import db, SplashParagraph, environment, SCHEMA
from sqlalchemy.sql import text

def seed_splashparagraphs():
    paragraphs=[SplashParagraph(title='Splash Header',header='Feel better with Aurora',paragraph='Aurora is an AI emotional wellness companion offering a unique blend of personalized support through conversation, mood tracking, and mindset tools, all in a safe space for self-exploration and growth.'),
                SplashParagraph(title=,header=,paragraph=),
                SplashParagraph(title=,header=,paragraph=),
                SplashParagraph(title=,header=,paragraph=),
                SplashParagraph(title=,header=,paragraph=),
                SplashParagraph(title=,header=,paragraph=)
                ]
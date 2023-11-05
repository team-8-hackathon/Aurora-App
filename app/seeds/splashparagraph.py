from app.models import db, SplashParagraph, environment, SCHEMA
from sqlalchemy.sql import text

def seed_splashparagraphs():
    paragraphs=[SplashParagraph(title='Splash Header',header='Feel better with Aurora',paragraph='Aurora is an AI emotional wellness companion offering a unique blend of personalized support through conversation, mood tracking, and mindset tools, all in a safe space for self-exploration and growth.'),
                SplashParagraph(title='bio',header='Meet the Founder',paragraph="Hi there! I'm Christina, a product designer with a passion for personal growth and mental well-being. I believe everyone should have access to knowledge and tools that lead to joy and fulfillment in life. And that's the heart behind Aurora. I hope you love her as much as I do 💛."),
                SplashParagraph(title='phone 1',header='Get tailored support based on what’s important to you.',paragraph="Lorem ipsum dolor sit amet consectetur. Volutpat mauris nullam donec sit et bibendum mauris."),
                SplashParagraph(title='phone 2',header="Learn to identify and name emotions for improved self-awareness.",paragraph="Lorem ipsum dolor sit amet consectetur. Volutpat mauris nullam donec sit et bibendum mauris."),
                SplashParagraph(title='phone 3',header="Need someone to talk to? Chat with Aurora anytime, anywhere.",paragraph="Lorem ipsum dolor sit amet consectetur. Volutpat mauris nullam donec sit et bibendum mauris."),
                SplashParagraph(title='benefit 1',header='Build deeper self-awareness',paragraph='With personalized mood tracking'),
                SplashParagraph(title='benefit 2',header='Improve your self-esteem',paragraph='With daily affirmations'),
                SplashParagraph(title='benefit 3',header='Cultivate a positive mindset',paragraph='With mindset tools')
                ]
    db.session.add_all(paragraphs)
    db.session.commit()

def unseed_paragraphs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.splashparagraphs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM splashparagraphs"))

    db.session.commit()

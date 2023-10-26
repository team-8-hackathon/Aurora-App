from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text


def seed_topic():
    topics = [Topic(topic='Emotional Wellness 101'), Topic(topic='Mental Self-Care'), Topic(topic='Relationship Wellness'), Topic(topic='Workplace Wellness')]

    for topic in topics:
        db.session.add(topic)
    db.session.commit()

def unseed_topic():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))
        
    db.session.commit()
from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text

#add topic tabs
def seed_topics():
    topics =[Topic(
        topic="Emotional Wellness 101"
        ),
        Topic(
        topic="Mental Self-Care"
        ),
        Topic(
        topic="Relationship Wellness"
        ),
        Topic(
        topic="Workplace Wellness"
        )
        ]
    db.session.add_all(topics)
    db.session.commit()

def unseed_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))
        
    db.session.commit()
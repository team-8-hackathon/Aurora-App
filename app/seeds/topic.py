from app.models import db, Topic, environment, SCHEMA

#add topic tabs
def seed_topics():
    topics =[Topic(
        topic="Emotional Wellness 101",
        color="#ffe27a"
        ),
        Topic(
        topic="Mental Self-Care",
        color="#ec9fb8"
        ),
        Topic(
        topic="Relationship Wellness",
        color="#9acfb1"
        ),
        Topic(
        topic="Workplace Wellness",
        color="#f4a182"
        )
        ]
    db.session.add_all(topics)
    db.session.commit()

def unseed_topics():
    table_name = f"{SCHEMA}.topics" if environment == "production" else "topics"

    with db.engine.connect() as connection:
        connection.execute(f"DELETE FROM {table_name};")
        connection.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")

    db.session.commit()
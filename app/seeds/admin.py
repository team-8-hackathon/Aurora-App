from app.models import db, Admin, environment, SCHEMA
from sqlalchemy.sql import text


#add demo admin
def seed_admin():
    demo = Admin(username="demolition", password="password")
    db.session.add(demo)
    db.session.commit()

def unseed_admin():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.admins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM admin"))
        
    db.session.commit()
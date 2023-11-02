from app.models import db, Admin, environment, SCHEMA
from sqlalchemy.sql import text


# Clear the table and reset auto-increment
def reset_table(table_name):
    with db.engine.connect() as connection:
        connection.execute(f"DELETE FROM {table_name};")
        connection.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")
        
#add demo admin
def seed_admin():
    demo = Admin(username="demolition", password="password")
    db.session.add(demo)
    db.session.commit()

def unseed_admin():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.admins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM admins"))
        
    db.session.commit()
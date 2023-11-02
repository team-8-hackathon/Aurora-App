from app.models import db, Admin, environment, SCHEMA


# Clear the table and reset auto-increment
def reset_table(table_name):
    with db.engine.connect() as connection:
        connection.execute(f"DELETE FROM {table_name};")
        connection.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")

# Add demo admin
def seed_admin():
    demo = Admin(username="demolition", password="password")
    db.session.add(demo)
    db.session.commit()

# Remove demo admin and reset the 'admins' table
def unseed_admin():
    if environment == "production":
        reset_table("admins")
    else:
        reset_table('admins')
    db.session.commit()
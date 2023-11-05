from app.models import db, Testimonial, environment, SCHEMA
from sqlalchemy.sql import text

def seed_testimonials():
  testimonials = [ Testimonial(
      first_name='Gabe',
      last_name='Reiter',
      stars=5,
      body='I love using this app. Helped me when I needed it',
      profile_pic='/images/userImg-1.png',
      favorited=True
    ),
    Testimonial(
      first_name='Ash',
      last_name='Iranfar',
      stars=5,
      body='A wonderful app',
      profile_pic='/images/userImg-2.png',
      favorited=True
    ),
    Testimonial(
      first_name='Emily',
      last_name='Morgan',
      stars=5,
      body='I use it everyday',
      profile_pic='/images/userImg-3.png',
      favorited=True
    ),
    Testimonial(
      first_name='Freddy',
      last_name='Rendon',
      stars=5,
      body='Love Lauren!',
      profile_pic='/images/userImg-4.png',
      favorited=True

    ),
    Testimonial(
      first_name='Dean',
      last_name='Ding',
      stars=5,
      body='Exactly what I needed',
      favorited=True
    )
  ]
  db.session.add_all(testimonials)
  db.session.commit()
  
def unseed_testimonials():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.testimonials RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM testimonials"))
        
    db.session.commit()
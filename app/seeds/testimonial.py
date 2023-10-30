from app.models import db, Testimonial, environment, SCHEMA
from sqlalchemy.sql import text

def seed_testimonials():
  testimonials = [ Testimonial(
      name='Gabe',
      stars=5,
      body='I love using this app. Helped me when I needed it',

    ),
    Testimonial(
      name='Ash',
      stars=5,
      body='A wonderful app',

    ),
    Testimonial(
      name='Emily',
      stars=5,
      body='I use it everyday',

    ),
    Testimonial(
      name='Freddy',
      stars=5,
      body='Love Lauren!',

    ),
    Testimonial(
      name='Dean',
      stars=5,
      body='Exactly what I needed',
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
from app.models import db, Blog, Topic, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blog():
    thumbnail1='/images/blog_background.png'
    title1='The Importance of Emotional Wellness'
    body1="""<h1>The Importance of Emotional Wellness</h1>
    <p>Emotional wellness is a crucial component of overall well-being. It refers to our ability to understand, express, and manage our emotions effectively. When we prioritize our emotional health, we lead more balanced and fulfilling lives.</p>

    <p>Here are some key points to consider:</p>

    <h2>1. Self-Awareness</h2>
    <p>Emotional wellness begins with self-awareness. Understanding your emotions and recognizing their impact on your thoughts and actions is the first step toward emotional well-being. Take time to reflect on your feelings and what triggers them.</p>

    <h2>2. Healthy Expression</h2>
    <p>Learning to express your emotions in a healthy way is vital. Bottling up emotions can lead to stress and anxiety. Find constructive outlets for your feelings, such as talking to a friend, journaling, or engaging in creative activities like art or music.</p>

    <h2>3. Resilience</h2>
    <p>Emotionally well individuals are better equipped to handle life's challenges. They develop resilience, which allows them to bounce back from adversity and maintain a positive outlook. Building resilience involves seeking support, maintaining a positive mindset, and learning from setbacks.</p>

    <blockquote class="quote">
        "Emotional wellness is the key to living a fulfilling life. It's okay to feel, and it's okay to seek help when needed."
    </blockquote>
    <p id="author">- Unknown</p>

    <h2>4. Stress Management</h2>
    <p>Chronic stress can take a toll on emotional well-being. Practicing stress management techniques, such as deep breathing exercises, meditation, and time management, can help reduce stress and promote emotional wellness.</p>

    <h2>5. Cultivate Positive Relationships</h2>
    <p>Healthy relationships play a significant role in emotional wellness. Surrounding yourself with supportive and caring individuals can boost your emotional health. Share your feelings with loved ones and seek their support when needed.</p>

    <p>In conclusion, emotional wellness is an essential aspect of our lives that requires attention and care. By nurturing our emotional health, we can navigate life's challenges with grace, find greater happiness, and build strong, meaningful connections with others.</p>

    <p>Take the time to understand, express, and manage your emotions, and you'll find yourself on a path to emotional wellness and a more fulfilling life.</p>

"""

    blog1 = Blog(thumbnail=thumbnail1, title=title1, body=body1)

    db.session.add(blog1)
    db.session.commit()
    topic = Topic.query.get(1)
    topic.blogs.append(blog1)
    db.session.commit()

def unseed_blog():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM blogs"))
        
    db.session.commit()
from app.models import db, Blog, environment, SCHEMA

def seed_blog():
    title1="Understanding emotional wellness: why it's vital for a balanced life"
    body1="""
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
    title2 = "The difference between emotional wellness and mental health"
    body2= """
    <p>Emotional wellness and mental health are terms often used interchangeably, but they refer to distinct aspects of our overall well-being. Understanding the differences between these two concepts is essential for taking a comprehensive approach to our health and happiness.</p>

    <h2>Emotional Wellness:</h2>

    <p>Emotional wellness is primarily concerned with the management of our emotions and the ability to navigate our feelings in a healthy way. It encompasses:</p>

    <ol>
        <li><strong>Self-Awareness:</strong> Emotional wellness begins with recognizing and understanding our emotions. It's about being in touch with how you feel and why.</li>
        <li><strong>Expression:</strong> It involves the healthy expression of emotions. This means finding appropriate outlets to communicate our feelings, whether through talking, writing, or artistic expression.</li>
        <li><strong>Resilience:</strong> Emotionally well individuals are better equipped to bounce back from adversity. They can cope with setbacks and maintain a positive outlook on life.</li>
        <li><strong>Stress Management:</strong> Effective stress management is a key component of emotional wellness. Techniques like meditation, deep breathing, and relaxation exercises help in managing emotional stress.</li>
    </ol>

    <h2>Mental Health:</h2>

    <p>On the other hand, mental health is a broader term that encompasses our emotional well-being but goes beyond it. It includes:</p>

    <ol>
        <li><strong>Cognition:</strong> Mental health concerns the way we think and our cognitive abilities. It addresses issues such as memory, problem-solving, and decision-making.</li>
        <li><strong>Diagnosable Conditions:</strong> Mental health can encompass diagnosed conditions such as depression, anxiety disorders, bipolar disorder, and schizophrenia.</li>
        <li><strong>Treatment and Support:</strong> Mental health often requires professional treatment and support. This can include therapy, counseling, medication, or a combination of these approaches.</li>
    </ol>

    <h2>The Relationship:</h2>

    <p>Emotional wellness and mental health are interconnected. Emotional well-being contributes to good mental health by promoting resilience and healthy emotional expression. At the same time, mental health conditions can affect emotional wellness.</p>

    <h2>Conclusion:</h2>

    <p>In summary, emotional wellness and mental health are related but distinct aspects of our well-being. Emotional wellness focuses on understanding and managing emotions, while mental health is a broader concept that includes cognitive functioning and diagnosable conditions. Both are vital for leading a fulfilling and balanced life.</p>

    <p>Taking care of our emotional wellness through self-awareness, expression, and resilience can contribute to better mental health, and seeking professional support when necessary is an essential step in maintaining both emotional and mental well-being.</p>

    <p><em>Remember, it's perfectly okay to seek help and support for both your emotional wellness and mental health when needed.</em></p>

"""
    for i in range(2):
        for j in range(4):
            topics = ['ew', 'msc', 'rw', 'ww']
            topic = topics[j]
            topic_id = j+1
            for k in range(6):
                url = f'/images/blog-images/{topic}{k+1}.png'
                if k % 2 == 0:
                    title = title2
                    body = body2
                else:
                    title = title1
                    body = body1
                blog = Blog(title=title, thumbnail=url, body=body, topic_id=topic_id)
                db.session.add(blog)
                db.session.commit()




def unseed_blog():
    table_name = "blogs"

    with db.engine.connect() as connection:
        connection.execute(f"DELETE FROM {table_name};")
        connection.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")

    db.session.commit()
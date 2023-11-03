import requests 

ENDPOINT = 'http://localhost:5000/'
client = requests.session()
client.get(f'{ENDPOINT}/api/docs')
if 'csrftoken' in client.cookies:
    csrftoken = client.cookies['csrftoken']
else:
    csrftoken = client.cookies['csrf_token']

login_data = dict(username="demolition", password="password", csrfmiddlewaretoken=csrftoken, next='/')

#image used for testing purposes
files = {'thumbnail': ('ew1.png', open('./ew1.png', 'rb'), 'image/png')}

headers = {
    'Content-Type': 'multipart/form-data'  # Specify the content type
}

#Test that the api is callable with the /api/docs route
def test_can_call_endpoint():
    response = requests.get(f'{ENDPOINT}/api/docs')
    assert response.status_code == 200


#################################Test auth functions:#################################################
def test_logout():
    #Start test suite logged out
    
    response = requests.get(f'{ENDPOINT}/api/auth/logout')
    assert response.status_code == 200

def test_can_get_auth():
    response = requests.get(f'{ENDPOINT}/api/auth')
    assert response.status_code == 200

def test_can_login():
    response = client.post(f'{ENDPOINT}/api/auth/login', data=login_data)
    assert response.status_code == 200


#############################Test Topic functions:##############################

def test_get_topics():
    response = requests.get(f'{ENDPOINT}/api/topics')
    assert response.status_code == 200

def test_post_topic():
    payload = get_topic_payload()
    response = create_topic(payload)
    data = response.json()
    id = data['id']
    assert response.status_code == 200
    #test that can get info for newly created topic
    response2 = get_topic(id)
    assert response2.status_code == 200
    data2 = response2.json()
    assert data2['color'] == '#000000'
    assert data2['topic'] == 'New topic'
    client.delete(f'{ENDPOINT}/api/topics/{id}/delete')

#Test can delete a topic
def test_delete_topic():
    payload = get_topic_payload()
    response = create_topic(payload)
    data = response.json()
    id = data['id']
    delete_response = client.delete(f'{ENDPOINT}/api/topics/{id}/delete')
    assert delete_response.status_code == 200
    get_deleted_topic = get_topic(id)
    assert get_deleted_topic.status_code == 404

#helper func to create a topic
def create_topic(payload):
    return client.post(f'{ENDPOINT}/api/topics/create', json=payload)

#helper func to get a topic
def get_topic(id):
    return requests.get(f'{ENDPOINT}/api/topics/{id}')

#helper func to get topic payload
def get_topic_payload():
    return {
        'topic': 'New topic',
        'color': '#000000'
    }


#################################Test Blog Functions###################################
def test_get_blogs():
    response = client.get(f'{ENDPOINT}/api/blogs')
    assert response.status_code == 200
    data = response.json()
    assert 'blogs' in data

#helper function to get a blog by id
def get_blog(id):
    return client.get(f'{ENDPOINT}/api/blogs/{id}')

#helper function to get a blog payload
def blog_payload():
    return {
        'thumbnail': files,
        'title': "testing blog",
        "body": "This is a test body",
        "topic_id": 1
    }
def blog_payload_edited():
    return {
        'thumbnail': files,
        'title': "edited testing blog",
        "body": "edited This is a test body",
        "topic_id": 2
    }

#helper function to create a blog
def create_blog(payload):
    return client.post(f'{ENDPOINT}/api/blogs/create',files=files, data=payload)

def test_create_blog():
    payload = blog_payload()
    response = create_blog(payload)
    data = response.json()
    assert 'id' in data
    id = data['id']
    res = get_blog(id)
    assert res.status_code == 200
    blog = res.json()
    assert 'body' in blog
    assert 'thumbnail' in blog
    assert 'title' in blog
    assert 'topic_id' in blog

    client.delete(f'{ENDPOINT}/api/blogs/{id}/delete')

def test_delete_blog():
    payload = blog_payload()
    response = create_blog(payload)
    data = response.json()
    id = data['id']
    delete_response = client.delete(f'{ENDPOINT}/api/blogs/{id}/delete')
    assert delete_response.status_code == 200
    data = delete_response.json()
    assert 'message' in data
    response = get_blog(id)
    assert response.status_code == 404


def test_edit_blog():
    payload = blog_payload()
    response = create_blog(payload)
    data = response.json()
    id = data['id']
    edited_payload = blog_payload_edited()
    edit_response = client.put(f'{ENDPOINT}/api/blogs/{id}/edit', edited_payload)
    edited_data = edit_response.json()
    assert edited_data['title'] == edited_payload['title']
    assert edited_data['body'] == edited_payload['body']
    assert edited_data['topic_id'] == edited_payload['topic_id']
    client.delete(f'{ENDPOINT}/api/blogs/{id}/delete')


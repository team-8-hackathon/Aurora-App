import requests 

ENDPOINT = 'http://localhost:5000/'
client = requests.session()
client.get(f'{ENDPOINT}/api/docs')
print(client.cookies['csrf_token'])
if 'csrftoken' in client.cookies:
    csrftoken = client.cookies['csrftoken']
else:
    csrftoken = client.cookies['csrf_token']

login_data = dict(username="demolition", password="password", csrfmiddlewaretoken=csrftoken, next='/')

#image used for testing purposes
files = {'thumbnail': ('ew1.png', open('app/tests/ew1.png', 'rb'), 'image/png')}

headers = {
    'Content-Type': 'multipart/form-data'  # Specify the content type
}

#Test that the api is callable with the /api/docs route
def test_can_call_endpoint():
    response = requests.get(f'{ENDPOINT}/api/docs')
    assert response.status_code == 200


# #################################Test auth functions:#################################################
def logout():
    return requests.get(f'{ENDPOINT}/api/auth/logout')
def test_logout():
    #Start test suite logged out
    
    response = logout()
    assert response.status_code == 200
    data = response.json()
    assert 'message' in data

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

###############################Test Splash Page Routes ###############
#Helper to return splash page payload
def splash_payload():
    return {
        'title': 'splash title',
        'header': 'splash header',
        'paragraph': 'splash paragraph'
    }

def edit_splash_payload():
    return {
        'title': 'edited splash title',
        'header': 'edited splash header',
        'paragraph': 'edited splash paragraph'
    }

#helper to create a new splash paragraph
def create_splash(payload):
    return client.post(f'{ENDPOINT}/api/splash/create',payload)

#helper to get a splash paragraph by its id
def get_splash(id):
    return requests.get(f'{ENDPOINT}/api/splash/{id}')

def test_get_all_splash():
    response = requests.get(f'{ENDPOINT}/api/splash/')
    assert response.status_code == 200
    data = response.json()
    assert 'paragraphs' in data

def test_create_splash():
    payload = splash_payload()
    response = create_splash(payload)
    # assert response.status_code == 200
    data = response.json()
    print(data)
    assert 'id' in data
    id = data['id']
    response = get_splash(id)
    assert response.status_code == 200
    data = response.json()
    assert 'title' in data
    assert 'header' in data
    assert 'paragraph' in data

    client.delete(f'{ENDPOINT}/api/splash/{id}/delete')


def test_edit_splash_paragraph():
    payload = splash_payload()
    response = create_splash(payload)
    data = response.json()
    id = data['id']
    edited_payload = edit_splash_payload()
    response = client.put(f'{ENDPOINT}/api/splash/{id}', data=edited_payload)
    edited = get_splash(id)
    assert edited.status_code == 200
    data = edited.json()
    assert data['title'] == 'edited splash title'
    assert data['header'] == 'edited splash header'
    assert data['paragraph'] == 'edited splash paragraph'

    client.delete(f'{ENDPOINT}/api/splash/{id}/delete')

def test_delete_splash():
    payload = splash_payload()
    response = create_splash(payload)
    data = response.json()
    id = data['id']
    deleted = client.delete(f'{ENDPOINT}/api/splash/{id}/delete')
    assert deleted.status_code == 200
    check_get = get_splash(id)
    assert check_get.status_code == 404

##############################Test Testimonial Routes ####################

def test_get_all_tests():
    response = requests.get(f'{ENDPOINT}/api/testimonial/')
    assert response.status_code == 200
    data = response.json()
    assert 'testimonials' in data

#helper function to define testimonial payload
def payload_tests():
    return {
        'profile_pic': files,
        'first_name': 'Emily',
        'last_name': "Morgan",
        'stars': 3,
        'body': "testimonial test"
    }

#helper function to create a testimonial
def create_testimonial(payload):
    return client.post(f'{ENDPOINT}/api/testimonial/new', data=payload, files=files)

#helper function to get a testimonial by id
def get_test(id):
    return requests.get(f'{ENDPOINT}/api/testimonial/{id}')

def test_create_testimonial():
    payload = payload_tests()
    response = create_testimonial(payload)
    print(response.status_code, response)
    assert response.status_code == 200
    data = response.json()
    assert 'id' in data
    id = data['id']
    res = get_test(id)
    assert res.status_code == 200
    test = res.json()
    assert 'first_name' in test
    assert 'last_name' in test
    assert 'profile_pic' in test
    assert 'stars' in test

    client.delete(f'{ENDPOINT}/api/testimonial/{id}/delete')


#test testimonial deletes
def test_delete_testimonials():
    payload = payload_tests()
    response = create_testimonial(payload)
    data = response.json()
    id = data['id']
    delete_response = client.delete(f'{ENDPOINT}/api/testimonial/{id}/delete')
    assert delete_response.status_code == 200
    data = delete_response.json()
    assert 'message' in data
    response = get_test(id)
    assert response.status_code == 404



logout()
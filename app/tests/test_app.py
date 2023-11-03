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
files = {'files': ('aurora.png', open('./aurora.png', 'rb'))}
print(files['files'])

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


#################################Test Testimonials Functions###################################
#helper to get testimonial payload
def get_testimonial_payload():
    return {
        'first_name': 'Emily',
        'last_name': 'Morgan',
        'stars': 4,
        'body': 'test body',
        'profile_pic': files
    }

#helper function to create a testimonial
def create_testimonial(payload):
    return client.post(f'{ENDPOINT}/api/testimonial/new', payload)

#helper function to get a testimonial by id
def get_testimonial(id):
    return client.get(f'{ENDPOINT}/api/testimonial/{id}')

#test get all testimonials
def test_get_testimonials():
    response = client.get(f'{ENDPOINT}/api/testimonial')
    assert response.status_code == 200

#test create a testimonial
def test_create_testimonial():
    payload = get_testimonial_payload()
    response = create_testimonial(payload)
    assert response.status_code == 201
    data = response.json()
    id = data['id']
    response_after = get_testimonial(id)
    assert response_after.status_code == 200
    new_data = response_after.json()
    first_name = payload['first_name']
    last_name = payload['last_name']
    assert new_data['first_name'] == first_name
    assert new_data['last_name'] == f'{last_name[0]}.'
    client.delete(f'{ENDPOINT}/api/testimonial/{id}/delete')


#test delete a testimonial
def test_delete_testimonial():
    payload = get_testimonial_payload()
    response = create_testimonial(payload)
    data = response.json()
    id = data['id']
    print('Data', data)
    response = client.delete(f'{ENDPOINT}/api/testimonial/{id}/delete')
    assert response.status_code == 200
    response2 = get_testimonial(id)
    assert response2.status_code == 404
import requests 

ENDPOINT = 'http://localhost:5000/'
client = requests.session()
client.get(f'{ENDPOINT}/api/docs')
if 'csrftoken' in client.cookies:
    csrftoken = client.cookies['csrftoken']
else:
    csrftoken = client.cookies['csrf_token']

login_data = dict(username="demolition", password="password", csrfmiddlewaretoken=csrftoken, next='/')

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

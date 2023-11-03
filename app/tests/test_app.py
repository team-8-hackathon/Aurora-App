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


#Test auth functions:
def test_logout():
    """
    Start test suite logged out
    """
    response = requests.get(f'{ENDPOINT}/api/auth/logout')
    assert response.status_code == 200

def test_can_get_auth():
    response = requests.get(f'{ENDPOINT}/api/auth')
    assert response.status_code == 200

def test_can_login():
    response = client.post(f'{ENDPOINT}/api/auth/login', data=login_data)
    assert response.status_code == 200



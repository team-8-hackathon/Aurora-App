import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError
from flask import request, jsonify
import json 



def get_subscribers(api_key, server_prefix, list_id):
    try:
        client = MailchimpMarketing.Client()
        client.set_config({
            "api_key": api_key,
            "server": server_prefix
        })

        response = client.lists.get_list_members_info(list_id)
        email_addresses = [member['email_address'] for member in response['members']]
        return email_addresses
    except ApiClientError as error:
        return f"Error: {error.text}"

#test cases
api_key = "4713cf3d0425545b46efab9926bdae70-us21"
server_prefix = "us21"
list_id = "8b0b556b44"

result = get_subscribers(api_key, server_prefix, list_id)
organized_result = json.dumps(result, indent=4)

print(organized_result)



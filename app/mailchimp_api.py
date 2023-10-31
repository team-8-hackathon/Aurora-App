import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError
from flask import request, jsonify
import json 
import os

API_KEY = os.environ.get("API_KEY")
SERVER_PREFIX = os.environ.get("SERVER_PREFIX")
LIST_ID = os.environ.get("8b0b556b44")


def get_subscribers(api_key, server_prefix, list_id):
    try:
        client = MailchimpMarketing.Client()
        client.set_config({
            "api_key": api_key,
            "server": server_prefix
        })

        data = client.lists.get_list_members_info(list_id)
        # data = [member['email_address'] for member in response['members']]
        return data
    except ApiClientError as error:
        return f"Error: {error.text}"

#test cases
# api_key = "4713cf3d0425545b46efab9926bdae70-us21"
# server_prefix = "us21"
# list_id = "8b0b556b44"

# result = get_subscribers(api_key, server_prefix, list_id)
# organized_result = json.dumps(result, indent=4)

# print(organized_result)



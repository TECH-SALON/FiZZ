import sys, os

moduledir = os.getcwd() + '/.venv/lib/python3.6/site-packages'
sys.path.append(moduledir)

import json
import boto3
import traceback
import botocore
import hmac
import hashlib
import base64
import warrant


class Cognito:

    def __init__(self):
        # self.identity_pool_id = os.getenv("AWS_IDENTITY_POOL_ID")
        # self.user_pool_id = os.getenv("AWS_USER_POOL_ID")
        # self.client_id = os.getenv("AWS_CLIENT_ID")
        # self.client_secret = os.getenv("AWS_CLIENT_SECRET")
        # self.region = os.getenv("AWS_REGION")
        return

    def sign_up(self, username, email, password):
        u = warrant.Cognito(
            self.user_pool_id,
            self.client_id,
            user_pool_region=self.region
        )
        u.add_base_attributes(email=email)
        return u.register(username, password)

    def login(self, username_or_alias, password):
        u = warrant.Cognito(
            self.user_pool_id,
            self.client_id,
            user_pool_region=self.region,
            username=username_or_alias
        )
        return u.authenticate(password=password)

####################### API #########################

def login(event, context):
    # Error Handling
    try:
        body = json.loads(event['body'])

        # Parameters Check
        username_or_alias = body['username_or_alias']
        password = body['password']

        print(f'Info: User Login Request {username}')
        cognito = Cognito()
        resp = cognito.login(username_or_alias, password)
        auth = resp['AuthenticationResult']
        ret = {
            'challenge_name': resp['ChallengeName'],
            'auth': {
                'access_token': auth['AccessToken'],
                'expires_in': auth["ExpiresIn"],
                'token_type': auth['TokenType'],
                'id_token': auth['IdToken'],
                'refresh_token': auth['RefreshToken']
            },
            'session': resp['Session']
        }

        return {'statusCode': 200, 'body': str(ret)}
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}


def sign_up_with_provider(event, context):
    try:
        body = json.loads(event['body'])

        provider = body['provider']
        if provider == 'google':
            pass
        else:
            return {'statusCode': 400, 'body': 'The Provider is not supported'}
    except:
        traceback.print_exc()
    return {'statusCode': 400, 'body': 'Request Failed'}


def sign_up(event, context):
    try:
        body = json.loads(event['body'])

        # Parameters Check
        username = body['username']
        email = body['email']
        password = body['password']

        print(f'Info: User SignUp Request {username}:{email}')
        cognito = Cognito()
        resp = cognito.sign_up(username, email, password)
        ret = {
            'confirmed': resp['UserConfirmed'],
            'delivery_details': resp['CodeDeliveryDetails']
        }

        return {'statusCode': 201, 'body': str(ret)}
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}


def handler(event, context):
    try:
        if event['httpMethod'] == 'GET':
            pass
        elif event['httpMethod'] == 'POST':
            if event['path'] == '/api/v1/auth/signup':
                return sign_up(event, context)
            elif event['path'] == '/api/v1/auth/login':
                return login(event, context)
        elif event['httpMethod'] == 'PUT':
            pass
        return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

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
        self.identity_pool_id = os.getenv("AWS_IDENTITY_POOL_ID")
        self.user_pool_id = os.getenv("AWS_USER_POOL_ID")
        self.client_id = os.getenv("AWS_CLIENT_ID")
        self.region = os.getenv("AWS_REGION")

        if self.identity_pool_id is None or self.user_pool_id is None or self.client_id is None or self.region is None:
            raise TypeError(f"Environments have None value. you must set variables idp: {self.identity_pool_id}, up:{self.user_pool_id}, cl:{self.client_id}, rg:{self.region}")

        self.identity_client = boto3.client('cognito-identity')
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

    def get_session(self, id_token):
        return self.identity_client.get_id(
            IdentityPoolId=self.identity_pool_id,
            Logins={
                f"cognito-idp.{self.user_pool_region}.amazonaws.com/{self.user_pool_id}": id_token
            }
        )

    def get_credentials_for_identity(self, identity_id, id_token=None):
        params = {
            'IdentityId': identity_id,
        }
        if id_token is not None:
            params['Logins'] = {
                f"cognito-idp.{self.user_pool_region}.amazonaws.com/{self.user_pool_id}": id_token
            }
        return self.identity_client.get_credentials_for_identity(**params)

####################### API #########################

def login(event, context):
    # Error Handling
    try:
        body = json.loads(event['body'])

        # Parameters Check
        username_or_alias = body['username']
        password = body['password']

        print(f'Info: User Login Request {username_or_alias}')
        cognito = Cognito()
        resp = cognito.login(username_or_alias, password)
        auth = resp['AuthenticationResult']
        ret = {
            'challengeName': resp['ChallengeName'],
            'auth': {
                'accessToken': auth['AccessToken'],
                'expiresIn': auth["ExpiresIn"],
                'tokenType': auth['TokenType'],
                'idToken': auth['IdToken'],
                'refreshToken': auth['RefreshToken']
            },
            'session': resp['Session']
        }

        return {'statusCode': 200, 'body': json.dumps(ret)}
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}


def get_session(event, context):
    try:
        body = json.loads(event['body'])

        provider = body['provider']
        if provider == 'google':
            id_token = body['id_token']
            resp = cognito.get_session(id_token)
            return {'statusCode': 200, 'body': json.dumps(resp)}
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
            'userConfirmed': resp['UserConfirmed'],
        }

        return {'statusCode': 201, 'body': json.dumps(ret)}
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

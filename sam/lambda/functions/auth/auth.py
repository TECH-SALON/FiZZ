import os
import json
import boto3
import traceback
import botocore
import hmac
import hashlib
import base64


class Cognito:

    def __init__(self):
        self.identity_pool_id = os.getenv("AWS_IDENTITY_POOL_ID")
        self.user_pool_id = os.getenv("AWS_USER_POOL_ID")
        self.client_id = os.getenv("AWS_CLIENT_ID")
        self.client_secret = os.getenv("AWS_CLIENT_SECRET")
        self.region = os.getenv("AWS_REGION")
        return

    def __get_client(self):
        return boto3.client('cognito-idp', 'us-east-1')

    def __get_identity_client(self):
        return boto3.client('cognito-identity')

    def get_secret_hash(self, username):
        message = username + self.client_id
        dig = hmac.new(self.client_secret, msg=message.encode('UTF-8'),
                       digestmod=hashlib.sha256).digest()
        return base64.b64encode(dig).decode()

    def sign_up(self, username, email, password):
        return self.__get_client().sign_up(
            ClientId=self.client_id,
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                }
            ]
        )

    def login(self, username_or_alias, password):
        return self.__get_client().admin_initiate_auth(
            UserPoolId=self.user_pool_id,
            ClientId=self.client_id,
            AuthFlow='ADMIN_NO_SRP_AUTH',
            AuthParameters={
                'USERNAME': username_or_alias,
                'PASSWORD': password,
                'SECRET_HASH': self.get_secret_hash(username_or_alias)
            }
        )

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

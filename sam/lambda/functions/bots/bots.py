import sys, os

if os.getenv('AWS_SAM_LOCAL'):
    moduledir = os.getcwd() + '/.venv/lib/python3.6/site-packages'
    sys.path.append(moduledir)

import simplejson
import json
import boto3

import traceback
from datetime import datetime
import uuid

from pytz import timezone
import cerberus

class DB:
    main_table = "Bots"
    BOT_SCHEMA = {
        'CREATE': {
            'botCode': {
                'required': True,
                'type': 'string',
                'regex': '^[a-zA-Z]\w{3,9}[a-zA-Z0-9]:[a-zA-Z]\w{3,9}[a-zA-Z0-9]$'
            },
            'name': {
                'required': True,
                'type': 'string',
                'regex': '^[a-zA-Z]\w{3,9}[a-zA-Z0-9]$'
            },
            'username': {
                'required': True,
                'type': 'string',
                'regex': '^[a-zA-Z]\w{3,9}[a-zA-Z0-9]$'
            },
            'gameName': {
                'required': True,
                'type': 'string',
                'allowed': ['reversi']
            },
            'resourceUrl': {
                'required': True,
                'type': 'string',
                'regex': 'https?://.+'
            },
            'runtime': {
                'required': True,
                'type': 'string',
                'allowed': ['python3.6', 'node--', 'golang1.9']
            },
            # 'isPrivate': {
            #     'required': True,
            #     'type': 'boolean',
            # },
            'description': {
                'type': 'string',
                'maxlength': 200
            }
        }
    }
    def __init__(self):
        if os.getenv("AWS_SAM_LOCAL"):
            self.db_client = boto3.resource(
                'dynamodb',
                endpoint_url="http://docker.for.mac.localhost:8000"
            )
        else:
            self.db_client = boto3.resource('dynamodb')

    def validates(self, item, schema_type):
        v = cerberus.Validator(self.BOT_SCHEMA[schema_type])
        valid = v.validate(item)
        if valid:
            error = None
            return True, error
        else:
            error = v.errors
            print(error)
            return False, error

    def create(self, item):
        # utc = str(datetime.now(timezone('UTC')))
        utc = str(datetime.now())
        success, attr = self.validates(item, 'CREATE')
        # dynamodb
        if success:
            self.db_client.Table(DB.main_table).put_item(Item=item)
            self.db_client.Table('Accounts').update_item(
                Key={
                    'username': item['username']
                },
                UpdateExpression='set bots = list_append(if_not_exists(bots, :empty), :b)',
                ExpressionAttributeValues={
                    ':b': [
                        {
                            'name': item['name'],
                            'username': item['username']
                        }
                    ],
                    ':empty': []
                },
                ReturnValues="ALL_NEW"
            )
            return (item, None)
        return (None, attr)

    def update(self, id, name=None, isPrivate=None, isQualified=None, isStandBy=None, repoUrl=None, rank=None, isMatching=None, isValid=None):
        # utc = str(datetime.now(timezone('UTC')))
        utc = str(datetime.now())
        item = {
            'name': name,
            'isPrivate': isPrivate,
            'isQualified': isQualified,
            'isStandBy': isStandBy,
            'repoUrl': repoUrl,
            'rank': rank,
            'isMatching': isMatching,
            'isValid': isValid,
            'updatedAt': utc
        }
        # dynamodb
        success, attr = self.validates(item)

        if success:
            updates = {}
            for k, v in item.items():
                if v is not None:
                    updates[k] = { 'Action': 'PUT', 'Value': v}

            resp = self.db_client.Table(DB.main_table).update_item(
                Key={'id': id },
                AttributeUpdates=updates,
                ReturnValues="ALL_NEW"
            )
            return (resp, None)
        return (None, attr)

    def query(self, table_name, key, value):
        table = self.db_client.Table(table_name)
        res = table.query(
            KeyConditionExpression = f"{key} = :val",
            ExpressionAttributeValues = {
                ":val": value
            }
        )
        return res

    def get(self, id):
        resp = self.query(DB.main_table, "id", id)
        return resp

    def scan(self, accountId):
        resp = self.db_client.Table(DB.main_table).scan()
        return resp

    def transform_game_name2id(self, name):
        res = self.query("Games", "gameName", name)
        return res


####################### API #########################

# TODO: Check Parameters
# TODO: Error and Exception Handling
# TODO: Manage Return Value (Serialize)

#GET /api/v1/bots
def scan_bots(event, context):
    print("imhere")
    print(event)
    try:
        db = DB()
        bots = db.scan('accountId')
        resp = {
            "headers":  { "Access-Control-Allow-Origin" : "*" },
            'statusCode': 200,
            "body": simplejson.dumps(bots, use_decimal=True)
        }
        return resp
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}

#GET /api/v1/bots/:botId
def get_bot(event, context):
    print(event)
    try:
        db = DB()
        resp = db.get('eeb4e9f0-f69c-4ad6-99f2-e82166188ce6')
        return {"statusCode": 200, "body": str(resp)}
    except:
        traceback.print_exc()
    return {'statusCode': 400, 'body': 'Request Failed'}

#POST /api/v1/bots/:gameName
def create_bot(event, context):
    print(event)
    try:
        db = DB()
        body = json.loads(event['body'])
        username = body['username']
        name = body['name']
        gameName = body['gameName']
        runtime = body['runtime']
        # isPrivate = body['isPrivate']
        resourceUrl = body['resourceUrl']
        description = body['description']
        item = {
            'botCode': username+":"+name,
            'name': name,
            'username': username,
            'gameName': gameName,
            'runtime': runtime,
            # 'isPrivate': isPrivate,
            'resourceUrl': resourceUrl,
            'description': description
        }
        new_bot, error = db.create(item)
        print(error)
        if error is None:
            return {
                "headers":  {
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Method": "POST"
                },
                "statusCode": 201,
                "body": simplejson.dumps(new_bot, use_decimal=True)
            }
        else:
            return {'statusCode': 405, 'body': f'Invalid input {error}'}
    except :
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}

# PUT /api/v1/bots/:botId
def update_bot(event, context):
    print(event)
    try:
        db = DB()
        body = json.loads(event['body'])
        id = event['pathParameters']['botId']
        resp, error = db.update(
            id,
            name=body['name'],
            isPrivate=body['isPrivate'],
            isStandBy=body['isStandBy'],
            repoUrl=body['repoUrl']
        )

        if error is None:
            return {'statusCode': 200, 'body': str(resp)}
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}


def handler(event, context):
    try:
        if event['httpMethod'] == 'GET':
            if event['pathParameters']:
                if 'botId' in event['pathParameters'].keys():
                    return get_bot(event, context)
                else:
                    pass
            else:
                return scan_bots(event, context)
        elif event['httpMethod'] == 'POST':
            return create_bot(event, context)
        elif event['httpMethod'] == 'PUT':
            return update_bot(event, context)
        return {'statusCode': 400, 'body': 'Request Failed'}
    except:
        traceback.print_exc()
    return {'statusCode': 500, 'body': 'Request Failed'}

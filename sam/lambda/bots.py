import os
import json
import boto3

from pytz import timezone
from datetime import datetime
import uuid

table_name = "Bots"
if os.getenv("AWS_SAM_LOCAL"):
    bots_table = boto3.resource(
        'dynamodb',
        endpoint_url="http://localhost:8000"
    ).Table(table_name)
else:
    bots_table = boto3.resource('dynamodb').Table(table_name)

class Bot():
    def create_bot(self, accountId, gameId, name, isPrivate, repoUrl):
        utc = datetime.now(timezone('UTC'))
        item = {
            'uuid': uuid.uuid4(),
            'accountId': accountId,
            'gameId': gameId,
            'name': name,
            'isPrivate': isPrivate,
            'qualified': False,
            'standBy': False,
            'repoUrl': repoUrl,
            'rank': -1,
            'updatedAt': utc,
            'createdAt': utc
        }

        success, msg = validates(item)
        # dynamodb
        if success:
            resp = bots_table.put_item(
                Item=item,
            )
            return (item, None)
        return (None, msg)

    def update_bot(self name=None, isPrivate=None, qualified=None, standBy=None, repoUrl=None, rank=None):
        utc = datetime.now(timezone('UTC'))
        item = {
            'name': name,
            'isPrivate': isPrivate,
            'qualified': qualified,
            'standBy': standBy,
            'repoUrl': repoUrl,
            'rank': rank,
            'updatedAt': utc
        }
        # dynamodb
        if validates(item):
            break
        return item

    def map_gameName_to_id(name):
        return ''

    def validates(item):
        # nameはアカウントごとにユニーク
        # それぞれのkeytypeをcheckする
        # if isPrivate is 1 then repoUrl is in FiZZ repo
        # gameId is valid
        return (True, {})


####################### API #########################

#GET /api/v1/bots
def get_bots(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {"statusCode": 200, "body": 'GET Bots!!'}
    elif event['httpMethod'] == 'POST':
        return {'statusCode': 400, 'body': 'This method is not supported.'}

#GET /api/v1/bots/:botId
def get_bot(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {"statusCode": 200, "body": 'GET Bot!!'}
    elif event['httpMethod'] == 'POST':
        return {'statusCode': 400, 'body': 'This method is not supported.'}

#POST /api/v1/bots/:gameName
def register_bot(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {'statusCode': 400, 'body': 'This method is not supported.'}
    elif event['httpMethod'] == 'POST':
        try:
            body = json.loads(event['body'])
        except:
            return {'statusCode': 400, 'body': 'malformed json input'}

        gameName = event['pathParameters']['gameName']

        if gameName is not 'reversi':
            return {'statusCode': 400, 'body': 'Invalid game name.'}


        return {'statusCode': 400, 'body': 'This method is not supported.'}

#POST /api/v1/bots/:botId
def stand_bot(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {'statusCode': 400, 'body': 'This method is not supported.'}
    elif event['httpMethod'] == 'POST':
        try:
            body = json.loads(event['body'])
        except:
            return {'statusCode': 400, 'body': 'malformed json input'}


        return {'statusCode': 400, 'body': 'This method is not supported.'}

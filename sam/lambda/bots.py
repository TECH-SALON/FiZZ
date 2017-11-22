import os
import json
import boto3

from pytz import timezone
from datetime import datetime
import uuid


class Bot:
    table_name = "Bots"

    def __init__(self):
        if os.getenv("AWS_SAM_LOCAL"):
            self.bots_table = boto3.resource(
                'dynamodb',
                endpoint_url="http://localhost:8000"
            ).Table(Bot.table_name)
        else:
            self.bots_table = boto3.resource('dynamodb').Table(Bot.table_name)


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

        success, attr = self.validates(item)

        # dynamodb
        if success:
            self.bots_table.put_item(Item=item);
            return (item, None)

        return (None, attr)

    def update_bot(self, uuid, name=None, isPrivate=None, qualified=None, standBy=None, repoUrl=None, rank=None):
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
        success, attr = self.validates(item):

        if success:
            updates = {}
            for k, v in item:
                if v is not None:
                    updates[k] = { 'Action': 'PUT', 'Value': v}

            resp = self.bots_table.update_item(
                Key={'uuid': uuid },
                AttributeUpdates=updates,
                ReturnValues="ALL_NEW"
            )
            return (resp, None)
        return (None, attr)



    def query(self, table_name, key, value):
        table = self.dynamodb.Table(table_name)
        try:
            res = table.query(
                KeyConditionExpression = Key(key).eq(value)
            )
            return res
        except Exception, e:
            return e

    def get(self, uuid):
        self.query(Bot.table_name, 'uuid', uuid)

    def scan(self):
        # self.scan()

    def transform_game_name2id(name):
        res = self.query("Games", "name", name)
        return res['uuid']

    def validates(item):
        # nameはアカウントごとにユニーク
        # それぞれのkeytypeをcheckする
        # if isPrivate is 1 then repoUrl is in FiZZ repo
        # gameId is valid
        error = {}
        return (True, error)

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

        bot = Bot()
        resp, error = bot.create_bot(
            accountId=body['accountId'],
            gameId=bot.transform_game_name2id(gameName),
            name=body['botName'],
            isPrivate=body['isPrivate'],
            repoUrl=body['repoUrl']
        )
        if error is None:
            return {'statusCode': 201, 'body': str(resp)}

        return {'statusCode': 400, 'body': 'Request Failed'}

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

    uuid = event['pathParameters']['botId']

    bot = Bot()
    resp, error = bot.update_bot(
        uuid, standBy=True
    )

    if error is None
        return {'statusCode': 200, 'body': str(resp)}

    return {'statusCode': 400, 'body': 'Request Failed'}

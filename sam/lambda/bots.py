import os
import json
import boto3

from pytz import timezone
from datetime import datetime
import uuid

# TODO: Check Parameters
# TODO: Validates
# TODO: Error and Exception Handling
# TODO: Manage Return Value

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
        utc = str(datetime.now(timezone('UTC')))
        item = {
            'uuid': uuid.uuid4(),
            'accountId': accountId,
            'gameId': gameId,
            'name': name,
            'isPrivate': isPrivate,
            'isQualified': False,
            'isStandBy': False,
            'repoUrl': repoUrl,
            'rank': -1,
            'isMatching': False,
            'isValid': False,
            'updatedAt': utc,
            'createdAt': utc
        }

        success, attr = self.validates(item)

        # dynamodb
        if success:
            self.bots_table.put_item(Item=item);
            return (item, None)

        return (None, attr)

    def update_bot(self, uuid, name=None, isPrivate=None, isQualified=None, isStandBy=None, repoUrl=None, rank=None, isMatching=None, isValid=None):
        utc = str(datetime.now(timezone('UTC')))
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
        except Exception as e:
            print(e.__doc__)
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
        # bot名のvalidation
        error = {}
        return (True, error)

####################### API #########################

#GET /api/v1/bots
def scan_bots(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {"statusCode": 200, "body": 'Scan Bots!!'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}

#GET /api/v1/bots/:botId
def get_bot(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return {"statusCode": 200, "body": 'GET Bot!!'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}

#POST /api/v1/bots/:gameName
def create_bot(event, context):
    print("Register bot");
    print(event)
    if event['httpMethod'] == 'POST':
        try:
            body = json.loads(event['body'])
            gameName = event['pathParameters']['gameName']
            bot = Bot()
            resp, error = bot.create_bot(
                accountId=body['accountId'],
                gameId=bot.transform_game_name2id(gameName),
                name=body['name'],
                isPrivate=body['isPrivate'],
                repoUrl=body['repoUrl']
            )
            ret = str(resp)
            print(ret)
        except Exception as e:
            print(e.__doc__)
            return {'statusCode': 400, 'body': 'Request Failed'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}

    if error is None:
        return {'statusCode': 201, 'body': ret}
    return {'statusCode': 400, 'body': 'Request Failed'}

# PUT /api/v1/bots/:botId
def update_bot(event, context):
    print(event)
    if event['httpMethod'] == 'PUT':
        try:
            body = json.loads(event['body'])
        except Exception as e:
            print(e.__doc__)
            return {'statusCode': 400, 'body': 'malformed json input'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}


    uuid = event['pathParameters']['botId']

    bot = Bot()
    resp, error = bot.update_bot(
        uuid,
        name=body['name'],
        isPrivate=body['isPrivate'],
        isStandBy=body['isStandBy'],
        repoUrl=body['repoUrl']
    )

    if error is None
        return {'statusCode': 200, 'body': str(resp)}

    return {'statusCode': 400, 'body': 'Request Failed'}


def handler(event, context):
    try:
        if event['httpMethod'] == 'GET':
            if 'botId' in event['pathParameters'].keys():
                # GetBot
                return get_bot(event, context)
            else:
                # ScanBots
                return scan_bots(event, context)
        elif event['httpMethod'] == 'POST':
            return create_bot(event, context)
        elif event['httpMethod'] == 'PUT':
            return update_bot(event, context)
        else:
            return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

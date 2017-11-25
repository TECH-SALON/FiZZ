import os
import json
import boto3

# from pytz import timezone
from datetime import datetime
import uuid

# TODO: Validates

class DB:
    main_table = "Bots"

    def __init__(self):
        if os.getenv("AWS_SAM_LOCAL"):
            print('execute for local')
            self.db_client = boto3.resource(
                'dynamodb',
                endpoint_url="http://localhost:8000"
            )
        else:
            print('executes for remote')
            # self.db_client = boto3.resource('dynamodb')
            self.db_client = boto3.resource(
                'dynamodb',
                endpoint_url="http://localhost:8000"
            )

    def validates(item):
        # nameはアカウントごとにユニーク
        # それぞれのkeytypeをcheckする
        # if isPrivate is 1 then repoUrl is in FiZZ repo
        # gameId is valid
        # bot名のvalidation
        error = {}
        return (True, error)

    def create(self, accountId, gameId, name, isPrivate, repoUrl):
        # utc = str(datetime.now(timezone('UTC')))
        utc = str(datetime.now())
        item = {
            'id': uuid.uuid4(),
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
            self.db_client.Table(DB.main_table).put_item(Item=item)
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
            for k, v in item:
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
        try:
            res = table.query(
                KeyConditionExpression = f"{key} = :val",
                ExpressionAttributeValues = {
                    ":val": {"S": f"{value}"}
                }
            )
            return (res, None)
        except Exception as e:
            print(e.__doc__)
            return (None, e)

    def get(self, id):
        resp, error = self.query(DB.main_table, 'id', id)
        if error is None:
            return (resp, None)
        return (None, error)

    def scan(self, accountId):
        try:
            resp = self.db_client.Table(DB.main_table).scan(
                Limit=100
            )
            return (resp, None)
        except Exception as e:
            print(e)
            return (None, e)

    def transform_game_name2id(name):
        res = self.query("Games", "name", name)
        return res['id']


####################### API #########################

# TODO: Check Parameters
# TODO: Error and Exception Handling
# TODO: Manage Return Value

#GET /api/v1/bots
def scan_bots(event, context):
    db = DB()
    print(event)
    if event['httpMethod'] == 'GET':
        resp, error = db.scan('accountId')
        if error is None:
            return {'statusCode': 200, "body": str(resp)}
    return {'statusCode': 400, 'body': 'Request Failed'}

#GET /api/v1/bots/:botId
def get_bot(event, context):
    db = DB()
    print(event)
    if event['httpMethod'] == 'GET':
        resp, error = db.get('eeb4e9f0-f69c-4ad6-99f2-e82166188ce6')
        return {"statusCode": 200, "body": 'GET Bot!!'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}

#POST /api/v1/bots/:gameName
def create_bot(event, context):
    db = DB()
    print("Register bot");
    print(event)
    if event['httpMethod'] == 'POST':
        try:
            body = json.loads(event['body'])
            gameName = event['pathParameters']['gameName']
            resp, error = db.create(
                accountId=body['accountId'],
                gameId=db.transform_game_name2id(gameName),
                name=body['name'],
                isPrivate=body['isPrivate'],
                repoUrl=body['repoUrl']
            )
            print(resp)
        except Exception as e:
            print(e.__doc__)
            return {'statusCode': 400, 'body': 'Request Failed'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}

    if error is None:
        return {'statusCode': 201, 'body': str(resp)}
    return {'statusCode': 400, 'body': 'Request Failed'}

# PUT /api/v1/bots/:botId
def update_bot(event, context):
    db = DB()
    print(event)
    if event['httpMethod'] == 'PUT':
        try:
            body = json.loads(event['body'])
        except Exception as e:
            print(e.__doc__)
            return {'statusCode': 400, 'body': 'malformed json input'}
    else:
        return {'statusCode': 400, 'body': 'This method is not supported.'}


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

    return {'statusCode': 400, 'body': 'Request Failed'}


def handler(event, context):
    try:
        if event['httpMethod'] == 'GET':
            if 'botId' in event['pathParameters'].keys():
                return get_bot(event, context)
            else:
                return scan_bots(event, context)
        elif event['httpMethod'] == 'POST':
            return create_bot(event, context)
        elif event['httpMethod'] == 'PUT':
            return update_bot(event, context)
        return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

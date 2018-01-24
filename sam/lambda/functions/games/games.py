import sys, os

if os.getenv('AWS_SAM_LOCAL'):
    moduledir = os.getcwd() + '/.venv/lib/python3.6/site-packages'
    sys.path.append(moduledir)

import json
import requests
import boto3
import traceback

from pytz import timezone
from datetime import datetime
import uuid

# TODO: Check Parameters
# TODO: Validates
# TODO: Error and Exception Handling
# TODO: Manage Return Value

class DB:
    main_table = "Games"

    def __init__(self):
        if os.getenv("AWS_SAM_LOCAL"):
            self.db_client = boto3.resource(
                'dynamodb',
                endpoint_url="http://localhost:8000"
            )
        else:
            self.db_client = boto3.resource('dynamodb')

    def create(self):
        utc = datetime.now(timezone('UTC'))
        item = {
            'id': uuid.uuid4(),
            'updatedAt': utc,
            'createdAt': utc
        }

        success, attr = self.validates(item)

        if success:
            self.db_client.Table(DB.main_table).put_item(Item=item);
            return (item, None)

        return (None, attr)

    def update(self, resultId):
        utc = datetime.now(timezone('UTC'))
        item = {
            'updatedAt': utc
        }

        success, attr = self.validates(item)

        if success:
            resp = self.db_client.Table(DB.main_table).update_item(
                Key={'name': 'reversi' },
                UpdateExpression='add results :id',
                ExpressionAttributeValues={':id': resultId},
                ReturnValues="ALL_NEW"
            )
            return (resp, None)
        return (None, attr)



    def query(self, table_name, key, value):
        table = self.db_client.Table(table_name)
        try:
            res = table.query(
                KeyConditionExpression = Key(key).eq(value)
            )
            return res
        except Exception as e:
            print(e.__doc__)
            return e

    def get(self, id):
        self.query(DB.main_table, 'id', id)

    def scan(self):
        # self.scan()
        return

    def validates(item):
        error = {}
        return (True, error)

####################### API #########################

def run_match(event, context):
    # Error Handling
    try:
        body = json.load(event['body'])
        gameName = event['pathParameters']['gameName']

        # Parameters Check
        if 'botId' in body.keys():
            botId = body['botId']
            if 'ruleId' in body.keys():
                pass
            if 'filter' in body.keys():
                pass
            # Return Response

        else:
            return {'statusCode': 400, 'body': 'Request Failed'}

    except Exception as e:
        print(e.__doc__)

    return {'statusCode': 400, 'body': 'Request Failed'}

def finish_match(event, context):
    # Error Handling
    # Parameters Check
    # Return Response
    return {'statusCode': 400, 'body': 'Request Failed'}

def get_ranking(event, context):
    # Error Handling
    # Parameters Check
    # Return Response
    return {'statusCode': 400, 'body': 'Request Failed'}

def code_check(event, context):
    try:
        db = DB()
        body = json.loads(event['body'])
        botCode = body['botCode']
        data = {
            'bots': [
              {
                'name': botCode.split(':')[1],
                'description': body['description'],
                'username': botCode.split(':')[0],
                'gameName': body['gameName'],
          	    'isPrivate': body['isPrivate'],
                'isQualified': body['isQualified'],
                'isStandBy': body['isStandBy'],
                'isValid': body['isValid'],
                'runtime': body['runtime'],
                'resourceUrl':body['resourceUrl']
              },
              {
                'name': 'RandamBot',
                'description': 'randam ai',
                'username': 'Yukits2',
                'gameName': 'Reversi',
                'isPrivate': True,
                'isQualified': True,
                'isStandBy': True,
                'isValid': True,
                'runtime': 'golang1.9',
                'resourceUrl': 'https://gist.github.com/Yukits/38e44ab5ffe2ab040e963c7f1e9ab0c0'
              }
            ],
            'config': {
              'name': 'Reversi',
              'rule': 'codecheck',
              'filter': 'none',
              'numOfFights': 3
            }
        }
        headers = {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        }
        response = requests.post('http://docker.for.mac.localhost:5000/api/v1/reversi', data=json.dumps(data), headers=headers, timeout=10).json()
        resultId = response['resultId']
        r, error = db.update(resultId)
        return {
            "headers":  {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Method": "POST"
            },
            "statusCode": 200,
            "body": r
        }
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}

def handler(event, context):
    print(event)
    proxy = event['pathParameters']['proxy']
    try:
        if event['httpMethod'] == 'GET':
            pass
        elif event['httpMethod'] == 'POST':
            if proxy == 'reversi/codecheck':
                return code_check(event, context)
            else:
                pass
        elif event['httpMethod'] == 'PUT':
            pass
        return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

import sys, os
import json
import boto3

import traceback
from datetime import datetime
import uuid

moduledir = os.getcwd() + '/.venv/lib/python3.6/site-packages'
sys.path.append(moduledir)

import simplejson as json
from pytz import timezone
from boto3.dynamodb.conditions import Key, Attr

# TODO: Check Parameters
# TODO: Validates
# TODO: Error and Exception Handling
# TODO: Manage Return Value

class DB:
    main_table = "BotResults"
    def __init__(self):
        if os.getenv("AWS_SAM_LOCAL"):
            self.db_client = boto3.resource(
                'dynamodb',
                endpoint_url="http://docker.for.mac.localhost:8000"
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

    def update(self, id):
        utc = datetime.now(timezone('UTC'))
        item = {
            'updatedAt': utc
        }

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
                    ":val": value
                }
            )
            return res
        except Exception as e:
            print(e.__doc__)
            return e

    def get(self, table_name, resultId, gameName):
        table = self.db_client.Table(table_name)
        try:
            res = table.get_item(
                Key = {
                    'id': resultId,
                    'gameName': gameName
                }
            )
            return res
        except Exception as e:
            print(e.__doc__)
            return e

    def scan(self):
        # self.scan()
        resp = self.db_client.Table(DB.main_table).scan()
        return resp

    def validates(item):
        error = {}
        return (True, error)

####################### API #########################

def scan_results(event, context):
    print(event)
    try:
        db = DB()
        results = db.scan()
        resp = {
            "headers":  { "Access-Control-Allow-Origin" : "*" },
            'statusCode': 200,
            "body": json.dumps(results, use_decimal=True)
        }
        return resp
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}

def get_result(event, context):
    print(event)
    resultId = event['pathParameters']['resultId']
    gameName = event['pathParameters']['gameName']
    print(gameName)
    try:
        db = DB()
        result = db.get("Results", resultId, "Reversi")
        print(result)
        resp = {
        "headers":  { "Access-Control-Allow-Origin" : "*" },
        'statusCode': 200,
        "body": json.dumps(result, use_decimal=True)
        }
        return resp
    except:
        traceback.print_exc()

    return {'statusCode': 400, 'body': 'Request Failed'}

def get_fights_log(event, context):
    # Error Handling
    # Parameters Check
    # Return Response
    return {'statusCode': 400, 'body': 'Request Failed'}

def handler(event, context):
    print(event)
    try:
        if event['httpMethod'] == 'GET':
            if 'resultId' in event['pathParameters'].keys():
                return get_result(event, context)
            else:
                return scan_results(event, context)
        elif event['httpMethod'] == 'POST':
            pass
        elif event['httpMethod'] == 'PUT':
            pass
        return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

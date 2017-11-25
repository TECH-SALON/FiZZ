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

    def update(self, id):
        utc = datetime.now(timezone('UTC'))
        item = {
            'updatedAt': utc
        }

        success, attr = self.validates(item):

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
                break
            if 'filter' in body.keys():
                break
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

def handler(event, context):
    try:
        if event['httpMethod'] == 'GET':
            break
        elif event['httpMethod'] == 'POST':
            break
        elif event['httpMethod'] == 'PUT':
            break
        return {'statusCode': 400, 'body': 'Request Failed'}
    except BaseException as e:
        print(e)
        return {'statusCode': 500, 'body': 'Request Failed'}

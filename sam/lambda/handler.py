import os
import json
import boto3

table_name = "Bots"
if os.getenv("AWS_SAM_LOCAL"):
    bots_table = boto3.resource(
        'dynamodb',
        endpoint_url="http://localhost:8000"
    ).Table(table_name)
else:
    bots_table = boto3.resource('dynamodb').Table(table_name)

def lambda_handler(event, context):
    print(event)
    if event['httpMethod'] == 'GET':
        return { 'hello': 'world'}
    elif event['httpMethod'] == 'POST':
        try:
            body = json.loads(event['body'])
        except:
            return {'statusCode': 400, 'body': 'malformed json input'}
        if 'vote' not in body:
            return {'statusCode': 400, 'body': 'missing vote in request body'}
        if body['vote'] not in ['spaces', 'tabs']:
            return {'statusCode': 400, 'body': 'vote value must be "spaces" or "tabs"'}

        resp = bots_table.update_item(
            Key={'id': body['vote']},
            UpdateExpression='ADD votes :incr',
            ExpressionAttributeValues={':incr': 1},
            ReturnValues='ALL_NEW'
        )
        return {'body': "{} now has {} votes".format(body['vote'], resp['Attributes']['votes'])}

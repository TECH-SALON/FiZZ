import os
import json
import boto3

####################### API #########################

def get_sessions(event, context):
    # Error Handling
    # Parameters Check
    # Return Response
    return {'statusCode': 400, 'body': 'Request Failed'}

def login(event, context):
    # Error Handling
    # Parameters Check
    # Return Response
    return {'statusCode': 400, 'body': 'Request Failed'}

def sign_up(event, context):
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

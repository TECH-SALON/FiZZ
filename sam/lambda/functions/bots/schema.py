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

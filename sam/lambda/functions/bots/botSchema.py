BOT_SCHEMA = {
    "CREATE": {
        'name': {
            'required': True,
            'type': 'string',
            'regex': '^[a-zA-Z]\w{3,9}[a-zA-Z]$'
        },
        'username': {
            'required': True,
            'type': 'string',
            'regex': '^[a-zA-Z]\w{3,9}[a-zA-Z]$'
        },
        'gameName': {
            'required': True,
            'type': 'string',
            'allowed': ['reversi']
        },
        'runtime': {
            'required': True,
            'type': 'string',
            'allowed': ['python3.6', 'node--', 'golang1.9']
        },
        'isPrivate': {
            'required': True,
            'type': 'integer',
            'allowed': [0,1]
        },
        'description': {
            'type': 'string',
            'maxlength': 200
        }

    }
}

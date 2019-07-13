from pony.orm import db_session, commit

from model import User

user_data = [
    {'name': 'Joan', 'unread': 0},
    {'name': 'Alan', 'unread': 4},
    {'name': 'Peter', 'unread': 39},
    {'name': 'Frank', 'unread': 75},
    {'name': 'Laura', 'unread': 11},
    {'name': 'Liam', 'unread': 0},
    {'name': 'Anne', 'unread': 0}
]

with db_session:
    for user in user_data:
        User(name=user['name'], unread=user['unread'])
commit()

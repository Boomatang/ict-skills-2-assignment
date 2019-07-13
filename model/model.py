import json
from datetime import datetime

from pony.orm import PrimaryKey, Optional, Set, Required, Database, select

from config import config
db = Database()


class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    unread = Optional(int)
    sent = Set('Message', reverse="sender")
    received = Set('Message', reverse="receiver")

    @staticmethod
    def get_all_users():

        users = select(u for u in User).order_by(User.name)[:]

        result = []

        for user in users:
            print(user)
            result.append(user.as_json())

        print(result)
        return {'users': result}

    def as_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'unread': self.unread
        }


class Message(db.Entity):
    id = PrimaryKey(int, auto=True)
    timestamp = Required(datetime)
    sender = Required('User', reverse="sent")
    receiver = Required('User', reverse="received")
    body = Required(str)

    def format_data(self, sender):
        if sender == self.sender.id:
            owner = True
        else:
            owner = False

        return {
            'id': self.id,
            'owner': owner,
            'sender': self.sender.name,
            'timestamp': self.timestamp.strftime("%d/%m/%y %H:%M"),
            'message': self.body
        }


db.bind(config)
db.generate_mapping(create_tables=True)

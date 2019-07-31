from datetime import datetime

from flask_sse import sse
from pony.orm import PrimaryKey, Set, Required, Database, select, count, db_session, commit

from config import config
db = Database()


class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    sent = Set('Message', reverse="sender")
    received = Set('Message', reverse="receiver")

    @staticmethod
    def get_all_users():

        users = select(u for u in User).order_by(User.name)[:]

        result = []

        for user in users:
            print(user)
            # TODO this should not have a hard coded value
            unread = user.unread_message(1)
            result.append(user.as_json(unread))

        print(result)
        return {'users': result}

    def unread_message(self, who):
        value = count(m for m in self.sent if not m.seen and m.receiver.id == who)
        return value

    def mark_as_read(self, sender_id):
        messages = (r for r in self.received if r.sender.id == sender_id)
        counter = 0
        with db_session:
            for message in messages:
                if not message.seen:
                    message.seen = True
                    counter -= 1
            commit()

        channel = f"{self.id}-{sender_id}-status"
        print(channel)

        sse.publish({'count': counter}, type=channel)

    def as_json(self, unread):
        return {
            'id': self.id,
            'name': self.name,
            'unread': unread
        }


class Message(db.Entity):
    id = PrimaryKey(int, auto=True)
    timestamp = Required(datetime)
    sender = Required('User', reverse="sent")
    receiver = Required('User', reverse="received")
    body = Required(str)
    seen = Required(bool, default=False)

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

from datetime import datetime
import arrow
from arrow.parser import ParserError
from flask import request, json
from flask_restful import Resource
from flask_sse import sse
from pony.orm import select, db_session, commit

from model import Message as msg
from model import User as user


class Message(Resource):
    def post(self):

        received_data = request.data
        received_data = json.loads(received_data)

        sender = int(received_data['sender'])
        receiver = int(received_data['receiver'])

        data_filter = [sender, receiver]

        data = select(m for m in msg if m.sender.id in data_filter and
                      m.receiver.id in data_filter).order_by(msg.timestamp)[:]

        messages = []

        for d in data:
            messages.append(d.format_data(sender))

        result = {
            'total': len(data),
            'messages': messages
        }

        return json.jsonify(result)


class SingleMessage(Resource):
    def post(self, receiver):
        received_data = request.data
        received_data = json.loads(received_data)
        person = select(u for u in user if u.id == receiver)
        person = person.first()

        if person is None:
            return {'Error': 'Receiver not found'}, 400

        sender = select(u for u in user if u.id == received_data['sender'])
        sender = sender.first()

        if sender is None:
            return {'Error': 'Sender not found'}, 400

        timestamp = received_data['timestamp']

        try:
            timestamp = arrow.get(timestamp).datetime
        except ParserError as err:
            timestamp = datetime.utcnow()
            print(err)

        body = received_data['body']

        channel = f"{receiver}-{sender.id}"
        print(channel)

        message = create_message(timestamp, sender, receiver, body, channel)
        channel = f"{receiver}-{sender.id}"
        print(channel)

        sse.publish({"message": message}, type=channel)

        return {'message': message}, 201


def create_message(timestamp, sender, receiver, body, channel):

    with db_session:
        message = msg(timestamp=timestamp, sender=sender, receiver=receiver, body=body)
        commit()

    if channel == f'{sender.id}-{receiver}':
        print('in first if')
        return message.format_data(sender.id)
    else:
        print('in else')

        return message.format_data(receiver)


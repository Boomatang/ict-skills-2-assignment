from flask import request, json
from flask_restful import Resource
from pony.orm import select

from model import Message as msg


class Message(Resource):
    def post(self):

        received_data = request.data
        received_data = json.loads(received_data)

        sender = received_data['sender']
        receiver = received_data['receiver']

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


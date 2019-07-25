from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from pony.flask import Pony

from config import config
from resources import User, Message, SingleMessage

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config.update(
    dict(PONY=config)
)

api.add_resource(User, "/user")
api.add_resource(Message, "/msg")
api.add_resource(SingleMessage, "/msg/<int:receiver>")

Pony(app)

if __name__ == "__main__":
    app.run(debug=True)

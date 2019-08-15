from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from pony.flask import Pony
from flask_sse import sse
from config import config
from resources import User, Message, SingleMessage, MessageStatus

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config.update(
    dict(PONY=config)
)
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix="/stream")

api.add_resource(User, "/user")
api.add_resource(Message, "/msg")
api.add_resource(MessageStatus, "/msg/status")
api.add_resource(SingleMessage, "/msg/<int:receiver>")

Pony(app)

if __name__ == "__main__":
    app.run(debug=True)

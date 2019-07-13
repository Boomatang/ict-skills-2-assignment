from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from pony.flask import Pony

from config import config
from resources import User

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config.update(
    dict(PONY=config)
)

api.add_resource(User, "/user")

Pony(app)

if __name__ == "__main__":
    app.run(debug=True)

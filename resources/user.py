from flask import request, json
from flask_restful import Resource
from model import User as db_User


class User(Resource):
    def get(self):
        users = db_User.get_all_users()
        return json.jsonify(users)

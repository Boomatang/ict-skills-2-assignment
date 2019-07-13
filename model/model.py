import json

from pony.orm import PrimaryKey, Optional, Set, Required, Database, select

from config import config
db = Database()


class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    unread = Optional(int)

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


db.bind(config)
db.generate_mapping(create_tables=True)

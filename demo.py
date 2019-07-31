import datetime

from pony.orm import db_session, commit, select
import random

from model import User, Message

user_data = [
    {'name': 'Joan'},
    {'name': 'Alan'},
    {'name': 'Peter'},
    {'name': 'Frank'},
    {'name': 'Laura'},
    {'name': 'Liam'},
    {'name': 'Anne'}
]

messages = [
    'Aenean a diam metus. Nunc ac vestibulum mauris. Nullam egestas auctor consectetur. Fusce quis lacinia urna, '
    'et lobortis.',
    'Donec egestas eget nibh at dictum. In non dapibus magna. Phasellus malesuada quis sem condimentum faucibus. In '
    'hendrerit. ',
    'Nulla porta erat sed mauris dapibus rutrum. Nulla egestas neque felis, ut tristique justo ornare quis. Aenean '
    'nulla mauris, bibendum a risus rhoncus, volutpat luctus.',
    'Donec nec suscipit dolor, sed rutrum sapien. In sed ligula eu sapien vestibulum viverra. Cras efficitur mattis '
    'nisl sit amet congue. Nunc ornare euismod turpis.'
]


def add_users():
    with db_session:
        for user in user_data:
            User(name=user['name'])
    commit()


@db_session
def add_messages():
    users = select(u for u in User)[:]
    y = 1
    while y < len(users):
        current = users[y-1]
        y += 1
        for them in users:
            if them == current:
                break

            choice = [current, them]

            stopper = random.randint(8, 15)
            start_date = datetime.datetime(2019, 7, 10, 13, 00)

            for x in reversed(list(random_date(start_date, stopper))):
                sender = random.choice(choice)
                receiver = [item for item in choice if item not in [sender]]
                receiver = receiver[0]

                body = random.choice(messages)
                timestamp = x

                Message(timestamp=timestamp, sender=sender, receiver=receiver, body=body)

        commit()


def random_date(start, l):
    current = start
    while l >= 0:
        current = current + datetime.timedelta(minutes=random.randrange(10))
        yield current
        l -= 1


if __name__ == '__main__':
    add_users()
    add_messages()

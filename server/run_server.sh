#!/usr/bin/env bash
echo starting Redis

redis-server &

echo starting backend

pipenv install

rm server/model/db.db3

pipenv run python server/demo.py
pipenv run python server/app.py

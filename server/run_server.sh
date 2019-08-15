#!/usr/bin/env bash
echo starting Redis

redis &

echo starting backend

pipenv install

rm model/db.db3

pipenv run python demo.py
pipenv run python app.py

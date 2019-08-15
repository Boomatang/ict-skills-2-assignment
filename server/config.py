import os

if os.environ.get("DEPLOY") == "production":
    config = {"provider": "sqlite", "filename": "production.db3", "create_db": True}
else:
    config = {"provider": "sqlite", "filename": "db.db3", "create_db": True}


print('*'*20)
print('\n')
print(f'Database been used : {config["filename"]}')
print('\n')
print('*'*20)

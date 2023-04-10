from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story():
    story1 = Story(
        user_id = 1,
        title = 'demostory1',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    story2 = Story(
        user_id = 1,
        title = 'demostory2',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    story3 = Story(
        user_id = 1,
        title = 'demostory3',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )


    db.session.add(story1)
    db.session.add(story2)
    db.session.add(story3)
    db.session.commit()


def undo_story():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.story RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM story"))


    db.session.commit()

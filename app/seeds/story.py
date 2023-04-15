from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text
from .storiesData import *


def seed_story():
    luke1 = Story(
        user_id = 1,
        title = 'The Echoes of Chronos',
        content = THE_ECHOES_OF_CHRONOS,
        image = 'https://i.ibb.co/8DGT1mJ/DALL-E-2023-04-14-12-59-12.png'
    )
    luke2 = Story(
        user_id = 1,
        title = 'The Whispering Shards',
        content = THE_WHISPERING_SHARDS,
        image = 'https://i.ibb.co/m68KgMP/DALL-E-2023-04-14-13-16-39-Lyra-at-the-center-reaches-out-towards-the-swirling-vortex-of-the-Nexus-w.png'
    )
    luke3 = Story(
        user_id = 1,
        title = 'The Jedi\'s Apprentice',
        content = THE_JEDIS_APPRENTINCE,
        image='https://i.redd.it/7p3elhmwqrs61.png'
    )
    story4 = Story(
        user_id = 2,
        title = 'demostory4',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    story5 = Story(
        user_id = 3,
        title = 'demostory5',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )


    db.session.add(luke1)
    db.session.add(luke2)
    db.session.add(luke3)
    db.session.add(story4)
    db.session.add(story5)
    db.session.commit()


def undo_story():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM story"))


    db.session.commit()

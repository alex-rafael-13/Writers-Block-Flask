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
    matt1 = Story(
        user_id = 2,
        title = 'Animatronics and Ghosts',
        content = ANIMATRONICS,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ovy2_QKjLqBOrNMzaxMMhVnn1jEta8hu1A&usqp=CAU'
    )
    matt2 = Story(
        user_id = 2,
        title = 'The End',
        content = THE_END,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuDmgx3kWG47b3-HeML3Sn1-Yyzn9Zzqmww&usqp=CAU'
    )
    matt3 = Story(
        user_id = 2,
        title = 'The Rise of Matt Patt',
        content = MATT_PATT,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa37I8he8dce_RF-TbX37CDp9B2NjcsWqGXw&usqp=CAU'
    )


    db.session.add(luke1)
    db.session.add(luke2)
    db.session.add(luke3)
    db.session.add(matt3)
    db.session.add(matt1)
    db.session.add(matt2)
    db.session.commit()


def undo_story():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM story"))


    db.session.commit()

from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text
from .storiesData import *


def seed_story():
    luke1 = Story(
        user_id = 1,
        title = 'The Echoes of Chronos',
        content = THE_ECHOES_OF_CHRONOS,
        image = 'https://writers-block-1.s3.us-west-1.amazonaws.com/default/echoes.png'
    )
    luke2 = Story(
        user_id = 1,
        title = 'The Whispering Shards',
        content = THE_WHISPERING_SHARDS,
        image = 'https://writers-block-1.s3.us-west-1.amazonaws.com/default/whispering.png'
    )
    luke3 = Story(
        user_id = 1,
        title = 'The Jedi\'s Apprentice',
        content = THE_JEDIS_APPRENTINCE,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/jedi.png'
    )
    matt1 = Story(
        user_id = 2,
        title = 'Animatronics and Ghosts',
        content = ANIMATRONICS,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/freddys.jpeg'
    )
    matt2 = Story(
        user_id = 2,
        title = 'The End',
        content = THE_END,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/minecraft.jpeg'
    )
    matt3 = Story(
        user_id = 2,
        title = 'The Rise of Matt Patt',
        content = MATT_PATT,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/mattpat.jpeg'
    )
    jon1 = Story(
        user_id = 3,
        title = 'The King of The North',
        content = THE_KING_OF_THE_NORTH,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/king-of-the-north.jpeg'
    )
    jon2 = Story(
        user_id = 3,
        title = 'The Tale of the Dragons',
        content = DRAGONS,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/dragons.jpeg'
    )
    jon3 = Story(
        user_id = 3,
        title = 'Dragon\'s Passion',
        content = DANI,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/daenerys.jpeg'
    )
    adam1 = Story(
        user_id = 4,
        title = 'Journey of a Struggling Chef',
        content = JENNA,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/chef.jpeg'
    )
    adam2 = Story(
        user_id = 4,
        title = 'A Night in Paris',
        content = NIGHT_IN_PARIS,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/paris.jpeg'
    )
    adam3 = Story(
        user_id = 4,
        title = 'My Life in New Orleans',
        content = LIFE_IN_NEW_ORLEANS,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/nola.jpeg'
    )
    lewis1 = Story(
        user_id = 5,
        title = 'Path of a Champion',
        content = PATH_OF_CHAMPS,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/champion.jpeg'
    )
    lewis2 = Story(
        user_id = 5,
        title = 'Breaking Barries',
        content = BREAKING_BARRIES,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/lewis.jpeg'
    )
    lewis3 = Story(
        user_id = 5,
        title = 'Brazil, My Love',
        content = BRAZIL,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/brazil.jpeg'
    )
    lewis4 = Story(
        user_id = 5,
        title = 'Serena, The Ultimate Champion',
        content = SERENA,
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/serena.jpeg'
    )
    db.session.add(luke3)
    db.session.add(adam2)
    db.session.add(lewis3)
    db.session.add(jon2)
    db.session.add(matt1)
    db.session.add(jon1)
    db.session.add(lewis4)
    db.session.add(matt3)
    db.session.add(adam1)
    db.session.add(lewis2)
    db.session.add(luke2)
    db.session.add(adam3)
    db.session.add(lewis1)
    db.session.add(jon3)
    db.session.add(matt2)
    db.session.add(luke1)
    db.session.commit()


def undo_story():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM stories"))


    db.session.commit()

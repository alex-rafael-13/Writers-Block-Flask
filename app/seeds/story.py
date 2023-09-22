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
        image='https://writers-block-1.s3.us-west-1.amazonaws.com/default/jedi.png'
    )
    matt1 = Story(
        user_id = 2,
        title = 'Animatronics and Ghosts',
        content = ANIMATRONICS,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwC6zQc51CaXL4kgiX0tc54yDxKqK7pXoZQ&usqp=CAU'
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
    jon1 = Story(
        user_id = 3,
        title = 'The King of The North',
        content = THE_KING_OF_THE_NORTH,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGF33IWwPuu2eNDbMAG70D_6y2282JgBpopQ&usqp=CAU'
    )
    jon2 = Story(
        user_id = 3,
        title = 'The Tale of the Dragons',
        content = DRAGONS,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR28YUDKKngiDua3_T511Yxj3DGHYNcddNtA&usqp=CAU'
    )
    jon3 = Story(
        user_id = 3,
        title = 'Dragon\'s Passion',
        content = DANI,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxkEPxvoxPVs2bPvUY3wZ0azT-PpRSRjVENg&usqp=CAU'
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
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqs5U7FztNvg-nuZTf0HZROtyuCNf_xF7SQ&usqp=CAU'
    )
    adam3 = Story(
        user_id = 4,
        title = 'My Life in New Orleans',
        content = LIFE_IN_NEW_ORLEANS,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgIPalxvQuGCGx3ZgX5a9Sudyto3uD0ZFrDA&usqp=CAU'
    )
    lewis1 = Story(
        user_id = 5,
        title = 'Path of a Champion',
        content = PATH_OF_CHAMPS,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUgrWvKUIOz0VCDWUPt54JpBErmV825-WeHg&usqp=CAU'
    )
    lewis2 = Story(
        user_id = 5,
        title = 'Breaking Barries',
        content = BREAKING_BARRIES,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlUe9fIlvOQ_WwSlfcl5tmBClp8MeyGy-o6Q&usqp=CAU'
    )
    lewis3 = Story(
        user_id = 5,
        title = 'Brazil, My Love',
        content = BRAZIL,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpw2VkGetdddvE42AIWbOmHYOY3hCbtvItvg&usqp=CAU'
    )
    lewis4 = Story(
        user_id = 5,
        title = 'Serena, The Ultimate Champion',
        content = SERENA,
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKM_X_i4dlWdtdRyvmg6KhR0WHQu5013ohA&usqp=CAU'
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

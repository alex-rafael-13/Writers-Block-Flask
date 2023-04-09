from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story():
    story1 = Story(
        user_id = 1,
        title = 'demostory1'
        content = 'demo1demo1demo1demo1demo1'
    )
    story2 = Story(
        user_id = 1,
        title = 'demostory2'
        content = 'demo1demo1demo1demo1demo1'
    )
    story3 = Story(
        user_id = 1,
        title = 'demostory3'
        content = 'demo1demo1demo1demo1demo1'
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

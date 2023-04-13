from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text


def seed_like():
    Like1 = Like(
        user_id = 1,
        story_id = 2
    )
    Like2 = Like(
        user_id = 2,
        story_id = 2
    )
    Like3 = Like(
        user_id = 3,
        story_id = 2
    )


    db.session.add(Like1)
    db.session.add(Like2)
    db.session.add(Like3)
    db.session.commit()


def undo_like():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM Like"))


    db.session.commit()

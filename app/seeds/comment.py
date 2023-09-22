from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comment():
    Comment1 = Comment(
        user_id = 1,
        story_id = 2,
        comment = 'test comment'
    )
    Comment2 = Comment(
        user_id = 2,
        story_id = 2,
        comment = 'test comment'
    )
    Comment3 = Comment(
        user_id = 3,
        story_id = 2,
        comment = 'test comment'
    )


    db.session.add(Comment1)
    db.session.add(Comment2)
    db.session.add(Comment3)
    db.session.commit()


def undo_comment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM comments"))


    db.session.commit()

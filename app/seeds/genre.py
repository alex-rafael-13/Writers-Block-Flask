from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text


def seed_genre():
    Genre1 = Genre(
        name = 'horror'
    )
    Genre2 = Genre(
        name = 'funny'
    )
    Genre3 = Genre(
        name = 'sad'
    )


    db.session.add(Genre1)
    db.session.add(Genre2)
    db.session.add(Genre3)
    db.session.commit()


def undo_genre():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM Genre"))


    db.session.commit()

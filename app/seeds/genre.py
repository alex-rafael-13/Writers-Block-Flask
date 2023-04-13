from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text


def seed_genre():
    science_fiction = Genre(
        name = 'Science Fiction'
    )
    fantasy = Genre(
        name = 'Fantasy'
    )
    romance = Genre(
        name = 'Romance'
    )
    mistery = Genre(
        name = 'Mistery'
    )
    crime = Genre(
        name = 'Crime'
    )
    horror = Genre(
        name = 'Horror/ Thriller'
    )
    inspirational = Genre(
        name = 'Inspirational'
    )
    educational = Genre(
        name = 'educational'
    )
    young_adult = Genre(
        name = 'Young Adult'
    )
    folklore = Genre(
        name = 'Folklore'
    )

    genres = [science_fiction, fantasy, romance, mistery, crime, horror, inspirational, educational, young_adult, folklore]

    for genre in genres:
        db.session.add(genre)
        
    db.session.commit()


def undo_genre():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM Genre"))


    db.session.commit()

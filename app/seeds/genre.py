from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text


def seed_genre():
    science_fiction = Genre(
        name = 'Sci-Fi'
    )
    fantasy = Genre(
        name = 'Fantasy'
    )
    romance = Genre(
        name = 'Romance'
    )
    mystery = Genre(
        name = 'Mystery'
    )
    crime = Genre(
        name = 'Crime'
    )
    horror = Genre(
        name = 'Horror'
    )
    history = Genre(
        name = 'History'
    )
    inspirational = Genre(
        name = 'Inspirational'
    )
    educational = Genre(
        name = 'Educational'
    )
    folklore = Genre(
        name = 'Folklore'
    )

    genres = [science_fiction, fantasy, romance, mystery, crime, horror, history, inspirational, educational, folklore]

    for genre in genres:
        db.session.add(genre)
        
    db.session.commit()


def undo_genre():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM Genre"))


    db.session.commit()

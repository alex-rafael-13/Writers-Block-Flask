from app.models import db, StoryGenre, environment, SCHEMA
from sqlalchemy.sql import text

def seed_story_genres():
    story_genre1 = StoryGenre(
        story_id = 1,
        genre_id = 1
    )
    story_genre2 = StoryGenre(
        story_id = 2,
        genre_id = 2,
    )
    story_genre3 = StoryGenre(
        story_id = 2,
        genre_id = 1
    )
    story_genre4 = StoryGenre(
        story_id = 3,
        genre_id = 3
    )

    db.session.add(story_genre1)
    db.session.add(story_genre2)
    db.session.add(story_genre3)
    db.session.add(story_genre4)
    db.session.commit()

def undo_story_genre():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.story_genre RESTART IDENTITY CASCADE")
        else:
            db.session.execute(text("DELETE FROM story_genre")) 

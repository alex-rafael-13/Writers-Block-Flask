from app.models import db, StoryGenre, environment, SCHEMA
from sqlalchemy.sql import text

def seed_story_genres():
    history_genres = [
         StoryGenre(
            story_id = 1,
            genre_id = 1 
         ),
         StoryGenre(
            story_id = 1,
            genre_id = 2 
         ),
         StoryGenre(
            story_id = 2,
            genre_id = 3 
         ),
         StoryGenre(
            story_id = 2,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 3,
            genre_id = 3 
         ),
         StoryGenre(
            story_id = 3,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 4,
            genre_id = 9 
         ),
         StoryGenre(
            story_id = 4,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 4,
            genre_id = 10 
         ),
         StoryGenre(
            story_id = 5,
            genre_id = 5 
         ),
         StoryGenre(
            story_id = 5,
            genre_id = 6 
         ),
         StoryGenre(
            story_id = 5,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 6,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 6,
            genre_id = 9 
         ),
         StoryGenre(
            story_id = 7,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 8,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 8,
            genre_id = 9 
         ),
         StoryGenre(
            story_id = 9,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 10,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 10,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 11,
            genre_id = 1 
         ),
         StoryGenre(
            story_id = 11,
            genre_id = 2 
         ),
         StoryGenre(
            story_id = 12,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 13,
            genre_id = 8 
         ),
         StoryGenre(
            story_id = 13,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 14,
            genre_id = 3 
         ),
         StoryGenre(
            story_id = 14,
            genre_id = 2 
         ),
         StoryGenre(
            story_id = 15,
            genre_id = 7 
         ),
         StoryGenre(
            story_id = 15,
            genre_id = 10 
         ),
         StoryGenre(
            story_id = 16,
            genre_id = 1 
         ),
         StoryGenre(
            story_id = 16,
            genre_id = 2 
         ),

    ]
    for pair in history_genres:
        db.session.add(pair)

    db.session.commit()

def undo_story_genre():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.story_genres RESTART IDENTITY CASCADE")
        else:
            db.session.execute(text("DELETE FROM story_genres"))

from flask.cli import AppGroup
from .users import seed_users, undo_users
from .follower import seed_follower, undo_follower
from .like import seed_like, undo_like
from .comment import seed_comment, undo_comment
from .story import seed_story, undo_story
from .genre import seed_genre, undo_genre
from .story_genres import seed_story_genres, undo_story_genre

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_follower()
    seed_comment()
    seed_like()
    seed_genre()
    seed_story()
    seed_story_genres()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_follower()
    undo_comment()
    undo_like()
    undo_genre()
    undo_story()
    undo_story_genre()
    # Add other undo functions here

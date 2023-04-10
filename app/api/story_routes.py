from app.models import User, Story, db, Genre, StoryGenre
from flask import Blueprint

story_routes = Blueprint('stories', __name__)

@story_routes.route('/', methods=['GET'])
def all_stories():

    # stories = db.session.query(Story,User).join(User).all()
    stories = User.query.join(Story).join(StoryGenre).join(Genre).all()
    print(stories)
    lst = []

    for user in stories:
        user_name = user.to_dict()['username']
        genres = story.genres
        story = story.to_dict()
        story['username'] = user_name
        story['genres'] = [genre.to_dict() for genre in genres]
        del story['user_id']
        lst.append(story)

    return lst

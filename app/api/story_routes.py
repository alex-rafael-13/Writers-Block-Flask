from app.models import User, Story, db, Genre, story_genre
from flask import Blueprint

story_routes = Blueprint('stories', __name__)

@story_routes.route('/', methods=['GET'])
def all_stories():

    stories = db.session.query(Story,User).join(User).all()

    lst = []

    for story,user in stories:
        user_name = user.to_dict()['username']
        genres = story.genres
        story = story.to_dict()
        story['username'] = user_name
        story['genres'] = genres
        del story['user_id']
        lst.append(story)

    return lst
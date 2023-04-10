from app.models import User, Story, db, Genre, story_genre
from flask import Blueprint

story_routes = Blueprint('stories', __name__)

@story_routes.route('/', methods=['GET'])
def all_stories():

    stories = db.session.query(Story,User).join(User).all()

    lst = []

    for story,user in stories:
        user_name = user.to_dict()['username']
        story = story.to_dict()
        # genres = db.session.query(story_genre, Genre).join(Genre).filter(story_genre,story_id=story.id).all()
        # print('--------------------->',genres)
        story['username'] = user_name
        del story['user_id']
        lst.append(story)

    return lst
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db, Story, Genre, StoryGenre

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user_story = db.session.query(User, Story, Genre)\
        .join(Story)\
        .join(StoryGenre)\
        .join(Genre)\
        .filter(User.id == id)\
        .all()
    # print(user_story)

    user_dict = {}
    for user, story, genre in user_story:
        if user.id not in user_dict:
            user_dict[user.id] = user.to_dict()
            user_dict[user.id]['stories'] = []
        story_dict = None
        for story_d in user_dict[user.id]['stories']:
            if story_d['id'] == story.id:
                story_dict = story_d
                break
        if story_dict is None:
            story_dict = story.to_dict()
            story_dict['genres'] = []
            user_dict[user.id]['stories'].append(story_dict)
        story_dict['genres'].append(genre.name)

    lst = list(user_dict.values())
    return lst

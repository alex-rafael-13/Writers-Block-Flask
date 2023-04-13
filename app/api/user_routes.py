from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db, Story

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
    user_story = db.session.query(User, Story)\
        .join(Story)\
        .filter(User.id == id)\
        .all()
    print(user_story)

    lst = []
    user_dict = {}

# loop over all user_story tuples and create a dictionary for each user
    for user, story in user_story:
         if user.id not in user_dict:
             user_dict[user.id] = user.to_dict()
             user_dict[user.id]['stories'] = []
         user_dict[user.id]['stories'].append(story.to_dict())

# convert user dictionary to list and return
    lst = list(user_dict.values())
    return lst

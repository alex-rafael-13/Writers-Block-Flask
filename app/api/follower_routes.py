from app.models import User, Follower, db
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import StoryForm
import ast
import json

follower_routes = Blueprint('follower', __name__)

@follower_routes.route('/<int:user_id>/followers', methods=['GET'])
def user_followers(user_id):
    followers = db.session.query(Follower)\
        .filter(user_id == Follower.following_id)\
        .all()

    lst = []
    for follower in followers:
        lst.append(follower.to_dict())

    lst_of_followers = []
    for follower2 in lst:
        user = db.session.query(User.id, User.username).filter(follower2['follower_id'] == User.id).all()
        print(user)
        # lst_of_followers.append(user.to_dict())
        dict = {
            'id': user[0][0],
            'username': user[0][1]
        }
        lst_of_followers.append(dict)
    
    return lst_of_followers

@follower_routes.route('/<int:user_id>/following', methods=['GET'])
def user_following(user_id):
    followers = db.session.query(Follower)\
        .filter(user_id == Follower.follower_id)\
        .all()

    lst = []
    for following in followers:
        lst.append(following.to_dict())

    lst_of_following = []
    for following2 in lst:
        user = db.session.query(User.id, User.username).filter(following2['following_id'] == User.id).all()
        print(user)
        # lst_of_followers.append(user.to_dict())
        dict = {
            'id': user[0][0],
            'username': user[0][1]
        }
        lst_of_following.append(dict)
    
    return lst_of_following
    # return lst

@follower_routes.route('/follow/<int:user_id>', methods=['POST','DELETE'])
@login_required
def follow_unfollow(user_id):
    if request.method == 'POST':
        new_follow = Follower(
            follower_id = current_user.id,
            following_id = user_id
        )
        db.session.add(new_follow)
        db.session.commit()
        return new_follow.to_dict()
    
    if request.method == 'DELETE':
        follow = db.session.query(Follower)\
        .filter(Follower.follower_id == current_user.id, Follower.following_id == user_id)\
        .first()
        if not follow:
            return {
                'message': f'Current user does not follow user with an id of {user_id}'
            }, 400
        print(follow, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        db.session.delete(follow)
        db.session.commit()
        return{'message':'Unfollow Successful',
               'id': follow.id}

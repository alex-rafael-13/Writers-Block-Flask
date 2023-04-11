from app.models import User, Story, db, Genre, StoryGenre, Comment,Like
from flask import Blueprint
from flask_login import current_user, login_required


story_routes = Blueprint('stories', __name__)

#get all story
@story_routes.route('/', methods=['GET'])
def all_stories():

    stories = db.session.query(Story, Genre.name, User.username)\
        .select_from(Story)\
        .join(StoryGenre)\
        .join(User)\
        .join(Genre)\
        .all()
    
    story_dict = {}

    for story, genre, username in stories:
        if story.id not in story_dict:
            story_dict[story.id] = story.to_dict()
            story_dict[story.id]['genres'] = [genre]
            story_dict[story.id]['username'] = username
        else:
            story_dict[story.id]['genres'].append(genre)

    return list(story_dict.values())


#get a single story
@story_routes.route('/<int:storyId>')
def get_story(storyId):
    story = db.session.query(Story, User.username,)\
        .select_from(Story)\
        .join(User)\
        .filter(Story.id == storyId)\
        .first()
    
    if not story:
        return { 
            'message': 'Story not found'
        }, 404

    likes = db.session.query(Like).filter(Like.story_id == storyId).count()

    genres = db.session.query(Genre.name)\
        .join(StoryGenre)\
        .filter(StoryGenre.story_id == storyId)\
        .all()
    
    comments = db.session.query(Comment.comment, User.username)\
        .join(User)\
        .filter(Comment.story_id == storyId)\
        .all()
    
    single_story, user = story

    result = { 
        'story': single_story.to_dict(),
        'user': user,
        'comments': [ {'comment': comment[0], 'username': comment[1]} for comment in comments ],
        'likes': likes,
        'genre': [genre[0] for genre in genres]
    }
    
    return result
 

#allow user to like a story
@story_routes.route('/<int:storyId>/like', methods=['POST'])
@login_required
def like_story(storyId): 
    story = db.session.query(Story).filter(Story.id == storyId).first()

    if not story:
        return { 
            'message': 'Story not found'
        }, 404
    
    liked = db.session.query(Like).filter(Like.story_id == storyId, Like.user_id == current_user.id).first()

    if liked: 
        return { 
            'message': 'Your already liked this story'
        }, 400
    
    like = Like(user_id=current_user.id, story_id=storyId)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

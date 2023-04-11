from app.models import User, Story, db, Genre, StoryGenre, Comment,Like
from flask import Blueprint

story_routes = Blueprint('stories', __name__)

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


@story_routes.route('/<int:storyId>')
def get_story(storyId):
    story = db.session.query(Story, User.username,)\
        .select_from(Story)\
        .join(User)\
        .filter(Story.id == storyId)\
        .first()
    
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
 

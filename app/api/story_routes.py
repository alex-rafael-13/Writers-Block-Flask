from app.models import User, Story, db, Genre, StoryGenre, Comment,Like , Story
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import StoryForm
import ast
import json
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
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

    # print(stories,'-------------------')

    for story, genre, username in stories:
        # print(story)
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
@story_routes.route('/<int:storyId>/like', methods=['GET', 'POST', 'DELETE'])
@login_required
def like_story(storyId):
    story = db.session.query(Story).filter(Story.id == storyId).first()

    if not story:
        return {
            'message': 'Story not found'
        }, 404

    if request.method == 'GET':
        likes = db.session.query(Like)\
            .filter(Like.story_id == storyId)\
            .all()

        return [like.to_dict() for like in likes]

    if request.method == 'DELETE':
        liked = db.session.query(Like).filter(Like.story_id == storyId, Like.user_id == current_user.id).first()


        db.session.delete(liked)
        db.session.commit()
        return {
            'message': 'Delete Successful'
        }


    if request.method == 'POST':
        liked = db.session.query(Like).filter(Like.story_id == storyId, Like.user_id == current_user.id).first()

        like = Like(user_id=current_user.id, story_id=storyId)
        db.session.add(like)
        db.session.commit()
        return like.to_dict()





@story_routes.route('/', methods=['POST'])
@login_required
def create_story():


    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n\n\nIn here')
    # data = request.get_json()
    # print(data)
    # genres = data['genres']


    if form.validate_on_submit():

        story_image = form.data['image']

        new_image = {}

        if(story_image):
            story_image.filename = get_unique_filename(story_image.filename)
            print('\n\n\n\n', story_image)

            new_image = upload_file_to_s3(story_image)
            print('\n\n\n\n',new_image)

            if 'url' not in new_image:
                return jsonify({"error": "Error uploading file to AWS"}, 401)
        else:
            new_image['url'] = 'https://writers-block-1.s3.us-west-1.amazonaws.com/default-writers-block.jpeg'

        new_story = Story(
            user_id = current_user.id,
            title = form.data['title'],
            content = form.data['content'],
            image = new_image['url']

        )
        db.session.add(new_story)
        db.session.commit()

        genres = form.data['genres']
        genre_list = genres.split(',')

        for genre in genre_list:
            genre_to_add = StoryGenre(
                story_id = new_story.id,
                genre_id = genre
            )
            db.session.add(genre_to_add)
            db.session.commit()
        return new_story.to_dict()

    if form.errors:
        return jsonify(form.errors), 400



@story_routes.route('/<int:storyId>', methods=['PUT'])
@login_required
def update_story(storyId):

    story_to_edit = Story.query.get(storyId)

    if not story_to_edit:
        return {
            'message': 'Story not found'
        }, 404

    form = StoryForm()
    data = request.get_json()
    genres = data['genres']






    form['csrf_token'].data = request.cookies['csrf_token']




    if form.validate_on_submit():






        story_to_edit.title = form.data['title']
        story_to_edit.content = form.data['content']
        story_to_edit.image = form.data['image']


        db.session.commit()



        # for genreId, action in genres.items():

        #     if action == 'delete':
        #         entry = StoryGenre.query.filter(StoryGenre.genre_id == genreId, StoryGenre.story_id == storyId).first()
        #         db.session.delete(entry)
        #         db.session.commit()
        #     else:
        #         entry = StoryGenre(
        #             story_id = storyId,
        #             genre_id = genreId

        #         )


        story_genre_entries = db.session.query(StoryGenre).filter(StoryGenre.story_id == story_to_edit.id)

        for entry in story_genre_entries:
            db.session.delete(entry)
            db.session.commit()



        for genreId in genres:

            if genreId == '':
                continue

            entry = StoryGenre(
                story_id = storyId,
                genre_id = genreId
            )
            db.session.add(entry)
            db.session.commit()




        return story_to_edit.to_dict()

    if form.errors:
        return jsonify(form.errors), 400






@story_routes.route('/<int:storyId>',methods=['DELETE'])
@login_required
def delete_story(storyId):


    story_to_delete = Story.query.get(storyId)


    if not story_to_delete:
        return {'errors': ['Story does not exist']}, 400

    db.session.delete(story_to_delete)
    db.session.commit()


    return {'message': 'Successfully deleted'}


@story_routes.route('/current')
@login_required
def current_userStory():
    storys = db.session.query(Story, Genre.name)\
        .select_from(Story)\
        .join(StoryGenre)\
        .join(Genre)\
        .filter(Story.user_id == current_user.id).all()


    story_dict = {}

    for story, genre,  in storys:
        # print(story)
        if story.id not in story_dict:
            story_dict[story.id] = story.to_dict()
            story_dict[story.id]['genres'] = [genre]
        else:
            story_dict[story.id]['genres'].append(genre)

    return list(story_dict.values())

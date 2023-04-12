from app.models import User, Story, db, Genre, StoryGenre, Comment,Like , Story
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

#get all current user comments
@comment_routes.route('/current')
@login_required
def currentUser_comment(): 
    comments = db.session.query(Comment, Story.title)\
    .join(Story)\
    .filter(Comment.user_id == current_user.id)\
    .all()

    if not comments:
        return { 
            'message': 'You dont have any comments'
        }, 400
    
    comment_list = []

    for comment, story_title in comments:
        comment_dict = comment.to_dict()
        comment_dict['story'] = story_title
        comment_list.append(comment_dict)
    
    return comment_list

#current user posting a comment on a story
@comment_routes.route('/<int:storyId>', methods=['GET', 'POST', 'DELETE', 'PUT'])
@login_required
def post_comment(storyId):
    story = db.session.query(Story).filter(Story.id == storyId).first()

    if not story:
        return { 
            'message': 'Story not found'
        }, 404


    if request.method == 'GET':
        story_comment = db.session.query(Comment).filter(Comment.story_id == storyId)
        if not [comment for comment in story_comment]:
            return { 
                'message': 'Story does not have any comments'
            }, 404
        
        return [comment.to_dict() for comment in story_comment]


    if request.method == 'POST':
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        comment = db.session.query(Comment)\
            .filter(Comment.story_id == storyId, Comment.user_id == current_user.id)\
            .first()
    
        if comment: 
            return { 
                'message': 'Your commented on this story already'
            }, 400

      
        if form.validate_on_submit():
            newComment = Comment(user_id=current_user.id, 
                                 story_id=storyId, 
                                 comment=form.data['comment'])
            
            db.session.add(newComment)
            db.session.commit()
            return newComment.to_dict()
        
        if form.errors:
            return jsonify(form.errors), 400
        

    if request.method == 'DELETE': 
        commented = db.session.query(Comment)\
            .filter(Comment.story_id == storyId, Comment.user_id == current_user.id)\
            .first()
        
        if not commented:
            return { 
                'message': 'You did not comment this story yet'
            }, 400

        db.session.delete(commented)
        db.session.commit()
        return { 
            'message': 'Delete Sucessful'
        }


    if request.method == 'PUT':
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        commented = db.session.query(Comment)\
            .filter(Comment.story_id == storyId, Comment.user_id == current_user.id)\
            .first()
        
        if not commented: 
            return {
                'message': 'You didnt comment this story'
            }, 400
        
        if current_user.id != commented.user_id:
            return { 
                'message': 'Authroization failed'
            }, 401

        if form.validate_on_submit(): 
            commented.comment = form.data['comment']
            db.session.commit()
            return commented.to_dict()

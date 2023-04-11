from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError





class StoryForm(FlaskForm):

    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    image = StringField('image')
    genres = StringField('genres',validators=[DataRequired()])

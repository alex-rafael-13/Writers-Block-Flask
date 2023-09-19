from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, FieldList
from wtforms.validators import DataRequired, Email, ValidationError
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileAllowed


class StoryForm(FlaskForm):

    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    image = FileField('image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    genres = StringField('genres',validators=[DataRequired()])
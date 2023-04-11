from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError





class StoryForm(FlaskForm):
    userId = IntegerField(
        'user_id', validators=[DataRequired()], nullable=False)
    title = StringField('title', validators=[DataRequired()], nullable=False)
    content = StringField('password', validators=[DataRequired()], nullable=False)
    image = StringField('image')

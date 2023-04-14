from .db import db, environment, SCHEMA, add_prefix_for_prod



class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)

     #relationships
    user = db.relationship('User',back_populates='stories')
    likes = db.relationship('Like',back_populates='stories', cascade='all, delete-orphan')
    comments = db.relationship('Comment',back_populates='story', cascade='all, delete-orphan')
    genres = db.relationship('StoryGenre', back_populates='story',cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image': self.image
        }



# story_genre = db.Table(

#    'story_genres',
#    db.Model.metadata,
#    db.Column('story_id',db.Integer,db.ForeignKey('stories.id'),primary_key=True),
#    db.Column('genre_id',db.Integer,db.ForeignKey('genres.id'),nullable=True)

# )



class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)

    stories = db.relationship('StoryGenre',back_populates='genres')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }



class StoryGenre(db.Model):
    __tablename__ = 'story_genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id'),ondelete='CASCADE') ,nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('genres.id')), nullable=False)

    story = db.relationship('Story', foreign_keys=[story_id], back_populates='genres')
    genres = db.relationship('Genre', foreign_keys=[genre_id], back_populates='stories')

    def to_dict(self):
        return {
            'id': self.id,
            'story_id': self.story_id,
            'genre_id': self.genre_id
        }

from .db import db, environment, SCHEMA



class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

     #relationships


    def to_dict(self):
        return { 
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image': self.image
        }


class Genre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)

    def to_dict(self):
        return { 
            'name': self.name
        }


class StoryGenre(db.Model):
    __tablename__ = 'genres'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)

    def to_dict(self):
        return { 
            'id': self.id,
            'story_id': self.story_id,
            'genre_id': self.genre_id
        }

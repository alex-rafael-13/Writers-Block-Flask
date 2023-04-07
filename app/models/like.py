from .db import db, environment, SCHEMA



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'))

    #relationships


    def to_dict(self):
        return { 
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id
        }

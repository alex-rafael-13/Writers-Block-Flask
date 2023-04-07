from .db import db, environment, SCHEMA



class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), nullable=False)
    comment = db.Column(db.String, nullable=False)


    def to_dict(self): 
        return { 
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'comment': self.comment
        }

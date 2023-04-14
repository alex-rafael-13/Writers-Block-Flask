from .db import db, environment, SCHEMA, add_prefix_for_prod



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')))

    #relationships

    user = db.relationship('User',back_populates='likes')
    stories = db.relationship('Story',back_populates='likes')



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id
        }

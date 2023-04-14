from .db import db, environment, SCHEMA, add_prefix_for_prod



class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    comment = db.Column(db.String, nullable=False)

    user = db.relationship('User',back_populates='comments')
    story = db.relationship('Story',back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'comment': self.comment
        }

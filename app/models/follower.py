from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')) ,nullable=False)
     #relationships
    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='followings')
    following = db.relationship('User', foreign_keys=[following_id], back_populates='followers')

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id
        }

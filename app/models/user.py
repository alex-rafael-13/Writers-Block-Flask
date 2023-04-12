from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follower import Follower

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)
    icon = db.Column(db.String, nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    #relationships
    followers = db.relationship('Follower', back_populates='follower', foreign_keys=[Follower.following_id])
    followings = db.relationship('Follower', back_populates='following', foreign_keys=[Follower.follower_id])
    stories = db.relationship('Story',back_populates='user')

    likes = db.relationship('Like',back_populates='user')
    comments = db.relationship('Comment',back_populates='user')





    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'bio': self.bio,
            'icon': self.icon,

        }

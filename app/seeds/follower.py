from app.models import db, Follower, environment, SCHEMA


def seed_follower():
    follower1 = Follower(
        follower_id=1, following_id=2
    )
    follower3 = Follower(
        follower_id=2, following_id=3
    )
    follower2 = Follower(
        follower_id=3, following_id=1
    )

    db.session.add(follower1)
    db.session.add(follower2)
    db.session.add(follower3)
    db.session.commit()

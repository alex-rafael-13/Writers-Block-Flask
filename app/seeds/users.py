from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    matt = User(
        username='TopTheorist',
        email='matt@aa.io',
        password='password',
        firstname='Matt',
        lastname='Patt',
        bio="Theorist, writer, and pop culture enthusiast. Join me as I dive deep into the worlds of movies, TV shows, and video games to uncover hidden meanings and share my wildest theories.",
        icon='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM3i-xMFYH5XS8XZi29KI2S1jKZD5F_UNxAZnxWCVhsC7S_o4zhHBuV_SXQ1a6YUoM6NQ&usqp=CAU'
        )
    jon = User(
        username='MrTargaryen', 
        email='jon@aa.io', 
        password='password',
        firstname='Jon', 
        lastname='Snow', 
        bio="King in the North, Protector of the Realm, and avid reader. Lover of all things Westerosi history and lore, but my heart truly belongs to the one and only Daenerys Targaryen.",
        icon='https://bbts1.azureedge.net/images/p/full/2021/08/7eec1afa-e039-485e-919e-798a72fd3f56.jpg'
    )
    adam = User(
        username='TheBurntChef', 
        email='adam@aa.io', 
        password='password', 
        firstname='Adam', 
        lastname='Jones', 
        bio="Hi there! I'm a book-loving, food enthusiast who loves to spend time exploring new recipes and curling up with a good book. When I'm not in the kitchen experimenting with new ingredients or diving into a novel, you can find me hiking in nature or enjoying quality time with friends and family. My passion for cooking and literature is fueled by my curiosity for learning and my love for experiencing new things. Join me on my journey of culinary and literary adventures!",
        icon='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzx-fHUNDLqoYSvbENBe3d-p1W1PfoleTaHR3VnKYUR9Y6ohSscIBdmzD7hLWxuw94bXY&usqp=CAU'
    )
    luke = User(
        username='TheSkywalker', 
        email='luke@aa.io', 
        password='password', 
        firstname='Luke', 
        lastname='Skywalker', 
        bio="Greetings! I'm Luke, a sci-fi book enthusiast with a boundless imagination and a love for all things out-of-this-world. I spend my days exploring new galaxies and encountering strange new life forms through the pages of my favorite books. When I'm not lost in a good read, you can usually find me tinkering with gadgets or watching the latest sci-fi flicks. Follow along for some intergalactic inspiration, book recommendations, and a glimpse into my sci-fi obsessed world!",
        icon='https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_fb34a1ff.jpeg?region=131%2C0%2C951%2C536'
    )
    lewis = User(
        username='SirSevenTimeChamp', 
        email='lewis@aa.io', 
        password='password', 
        firstname='Lewis', 
        lastname='Hamilton', 
        bio="7-time Formula One World Champion, fashion enthusiast, and avid writer. Sharing my experiences on and off the track, one story at a time. #NeverGiveUp #TeamLH",
        icon=''
    )


    db.session.add(luke)
    db.session.add(matt)
    db.session.add(jon)
    db.session.add(adam)
    db.session.add(lewis)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()

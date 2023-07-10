from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.orm import validates    
from sqlalchemy import MetaData

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'decks'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String)
    deck_name = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    def __repr__(self):
        return f'<Deck id:{self.id}, name:{self.deck_name}, price:{self.price}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, default='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png')
    bio = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    def __repr__(self): 
        return f'<User id:{self.id}, username:{self.username}, email:{self.email}>'
    
class Spot(db.Model, SerializerMixin):
    __tablename__ = 'spots'
    
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    images = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    def __repr__(self):
        return f'<Spot id: {self.id}, location: {self.location}>'
    
class User_Deck(db.Model, SerializerMixin):
    __tablename__ = 'user_decks'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    wishlist = db.Column(db.Boolean, default=False)
    
    def __repr__(self):
        return f'<User deck id:{self.id}, user_id:{self.user_id}, deck_id:{self.deck_id}>'
    
class User_Spot(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_spots = db.Column(db.Integer, db.ForeignKey('spots.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    def __repr__(self):
        return f'User Spots id:{self.id}, user_spots:{self.user_spots}, user_id:{self.user_id}>'

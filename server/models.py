from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.orm import validates    
from sqlalchemy import MetaData

#TODO add validations

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'decks'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String)
    deck_name = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user_decks = db.relationship('User_Deck', back_populates='decks')
    
    serialize_only = ('id', 'brand', 'deck_name', 'price', 'image')
    
    def __repr__(self):
        return f'<Deck id:{self.id}, name:{self.deck_name}, price:{self.price}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, default='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png')
    bio = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user_spots = db.relationship('User_Spot', back_populates='users')
    user_decks = db.relationship('User_Deck', back_populates='users')
    # decks = db.relationship('Deck', back_populates='user')
    # spots = db.relationship('Spot', back_populates='user')
    
    serialize_only = ('id', 'username', 'email', '-password_hash', 'profile_picture', 'bio')
    
    def __repr__(self): 
        return f'<User id:{self.id}, username:{self.username}, email:{self.email}>'
    
class Spot(db.Model, SerializerMixin):
    __tablename__ = 'spots'
    
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    # user_spots = db.relationship('User_Spot', back_populates='spot')
    users = db.relationship('User', secondary='user_spots', back_populates='spot')
    
    serialize_only = ('id', 'location', 'image', 'description')
    
    def __repr__(self):
        return f'<Spot id: {self.id}, location: {self.location}>'
    
class User_Deck(db.Model, SerializerMixin):
    __tablename__ = 'user_decks'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    wishlist = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    users = db.relationship('User', back_populates='user_deck')
    decks = db.relationship('Deck', back_populates='user_deck')
    
    serialize_only = ('id', 'user_id', 'deck_id', 'wishlist')
    
    def __repr__(self):
        return f'<User deck id:{self.id}, user_id:{self.user_id}, deck_id:{self.deck_id}>'
    
class User_Spot(db.Model, SerializerMixin):
    __tablename__ = 'user_spots'
    
    id = db.Column(db.Integer, primary_key=True)
    spots = db.Column(db.Integer, db.ForeignKey('spots.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    users = db.relationship('User', back_populates='user_spot')
    spots = db.relationship('Spot', back_populates='user_spot')
    
    serialize_only = ('id', 'spots', 'user_id')
    
    def __repr__(self):
        return f'User Spots id:{self.id}, user_spots:{self.user_spots}, user_id:{self.user_id}>'

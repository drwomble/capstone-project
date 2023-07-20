from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy

#TODO add validations

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'decks'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String)
    deck_name = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    stripe_product_id = db.Column(db.String)
    stripe_price_id = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user = db.relationship('User', back_populates='deck')
    
    
    serialize_only = ('id', 'brand', 'deck_name', 'price', 'image', 'user_id', "stripe_product_id", 'stripe_price_id')
    
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
    
    spot = db.relationship('Spot', back_populates='user')
    deck = db.relationship('Deck', back_populates='user')
    receipt = db.relationship('Receipt', back_populates='user')
    
    serialize_only = ('id', 'username', 'email', '-password_hash', 'profile_picture', 'bio')
    
    def __repr__(self): 
        return f'<User id:{self.id}, username:{self.username}, email:{self.email}>'
    
class Spot(db.Model, SerializerMixin):
    __tablename__ = 'spots'
    
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user = db.relationship('User', back_populates='spot')
    
    serialize_only = ('id', 'location', 'image', 'description', 'name', 'user_id')
    
    def __repr__(self):
        return f'<Spot id: {self.id}, location: {self.location}>'
    
class Receipt(db.Model, SerializerMixin):
    __tablename__ = 'receipts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    amount_paid = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    user = db.relationship('User', back_populates='receipt')
    
    serialize_only = ('id', 'user_id', 'amount_paid', 'product_id')
    
    def __repr__(self):
        return f'<Receipt id: {self.id}, amount paid: {self.amount_paid}>'
#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports

# Local imports
from app import app
from models import * 
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    with app.app_context():
        print('Deleting current tables....')
        Deck.query.delete()
        User.query.delete()
        Spot.query.delete()
        # User_Deck.query.delete()
        # User_Spot.query.delete()
        print('Seeding data....')
        
        deck_1 = Deck(brand='Toy Machine', deck_name='test', price=25, image='https://www.stokedboardshop.be/cdn/shop/products/Stoned-Skateboarding-Super-Stoned-Mario-Skateboard-Deck.jpg?v=1591725642')
        deck_2 = Deck(brand='Girl', deck_name='test', price=45, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817')
        
        user_1 = User(username='test', email='test', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        
        spot_1 = Spot(location= 'over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot')
        
        print('Done seeding data....')

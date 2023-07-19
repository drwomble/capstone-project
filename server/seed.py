#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports

# Local imports
from app import app
from models import Deck, User, Spot, Receipt
from werkzeug.security import generate_password_hash
from config import db
# from flask import session

if __name__ == '__main__':
    with app.app_context():
        print('Deleting current tables....')
        Deck.query.delete()
        User.query.delete()
        Spot.query.delete()
        Receipt.query.delete()
        print('Seeding data....')
        
        deck_1 = Deck(brand='Toy Machine', deck_name='test', price=25, image='https://www.stokedboardshop.be/cdn/shop/products/Stoned-Skateboarding-Super-Stoned-Mario-Skateboard-Deck.jpg?v=1591725642', user_id=1)
        deck_2 = Deck(brand='Girl', deck_name='test', price=45, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', user_id=1)
        deck_3 = Deck(brand='Girl', deck_name='test', price=45, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', user_id=1)
        
        user_1 = User(username='test', email='test1', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        user_2 = User(username='test', email='test2', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        user_3 = User(username='test', email='test3', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        
        spot_1 = Spot(location='over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot', name='el toro', user_id=1)
        spot_2 = Spot(location='over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot', name= 'the spot', user_id=1)
        spot_3 = Spot(location='over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot', name='sponge stairs', user_id=1)
        
        receipt_1 = Receipt(user_id=1, paid_in_full=True, first_name='drew', last_name='Womble', address='way ova there', amount_paid=45, product_id=22)
        
        receipt_2 = Receipt(user_id=1, paid_in_full=False, first_name='drew', last_name='NotWomble', address='way ova there', amount_paid=45, product_id=24)
        
        receipt_3 = Receipt(user_id=2, paid_in_full=True, first_name='James', last_name='Loser', address='way ova there', amount_paid=45, product_id=36)
        
        
        db.session.add_all([deck_1, deck_2, deck_3, user_1, user_2, user_3, spot_1, spot_2, spot_3, receipt_1, receipt_2, receipt_3])
        db.session.commit()
        
        print('Done seeding data....')
        

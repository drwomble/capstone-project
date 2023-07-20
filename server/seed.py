#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import stripe

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
        
        deck_1 = Deck(brand='Welcome', deck_name='Sloth On Bunyip', price=65, image='https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Welcome-Sloth-On-Bunyip-White%2C-Blue-%26-Yellow-8.0%22-Skateboard-Deck-_320236-front-US.jpg', user_id=1, stripe_product_id='prod_OIfLm9cWToacVp', stripe_price_id='price_1NW413CCsCgVNEg9Xhfd4xYy')
        deck_2 = Deck(brand='Girl', deck_name='Simon Bannerot', price=35, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', user_id=1, stripe_product_id='prod_OIfM3pYaKEtRxX', stripe_price_id='price_1NW41yCCsCgVNEg9U4UthLGN')
        deck_3 = Deck(brand='Girl', deck_name='Basic', price=25, image='data:image/jpeg;base64,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', user_id=1, stripe_product_id='prod_OIfOAYt4Ov7k4v', stripe_price_id='price_1NW43aCCsCgVNEg9lRsX3Ghp')
        
        user_1 = User(username='test', email='test1', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        user_2 = User(username='test', email='test2', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        user_3 = User(username='test', email='test3', password_hash=generate_password_hash('123', method='scrypt'), bio='test')
        
        spot_1 = Spot(location='over there', image='https://storage.googleapis.com/fsscs1/images/small/o4hlwj1oqdclol7gdc0sye5cnnj4c74c.jpg', description='its a spot', name='el toro', user_id=1)
        spot_2 = Spot(location='over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot', name= 'the spot', user_id=1)
        spot_3 = Spot(location='over there', image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', description='its a spot', name='sponge stairs', user_id=1)
        
        receipt_1 = Receipt(user_id=1, amount_paid=45, product_id=22)
        
        receipt_2 = Receipt(user_id=1, amount_paid=45, product_id=24)
        
        receipt_3 = Receipt(user_id=2, amount_paid=45, product_id=36)
        
        
        db.session.add_all([deck_1, deck_2, deck_3, user_1, user_2, user_3, spot_1, spot_2, spot_3, receipt_1, receipt_2, receipt_3])
        db.session.commit()
        
        print('Done seeding data....')

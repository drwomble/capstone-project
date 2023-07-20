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
        
        deck_1 = Deck(brand='Welcome', deck_name='Sloth On Bunyip', price=65, image='https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Welcome-Sloth-On-Bunyip-White%2C-Blue-%26-Yellow-8.0%22-Skateboard-Deck-_320236-front-US.jpg', user_id=1)
        deck_2 = Deck(brand='Girl', deck_name='test1', price=25, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', user_id=1)
        deck_3 = Deck(brand='Girl', deck_name='test2', price=45, image='https://mainlandskateandsurf.com/cdn/shop/products/girl-deck-bannerot-93-til-deck-teal_680x.png?v=1672354817', user_id=1)
        
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
        
        print('Creating products on stripe...')
        
        
    def create_product(new_deck):
    
        new_product = stripe.Product.create(name=new_deck.deck_name)
    
        stripe.Price.create(
            unit_amount= (new_deck.price * 100),
            currency= 'usd',
            product= new_product.id
        )
    
    create_product(deck_1)
    create_product(deck_2)
    create_product(deck_3)
    
    print('done creating products on stripe')

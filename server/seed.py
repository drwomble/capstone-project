#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports

# Local imports
from app import app
from models import db, Deck, Spot, User, User_Deck, User_Spot
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    with app.app_context():
        print('Deleting current tables....')
        Deck.query.delete()
        User.query.delete()
        Spot.query.delete()
        User_Deck.query.delete()
        User_Spot.query.delete()
        print('Seeding data....')
        
        
        

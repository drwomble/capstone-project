#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session, abort, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Deck, Spot, Receipt
from flask_restful import Resource
from functools import wraps
from os import environ
# import requests
import ipdb

# Local imports
from config import app, db, api, stripe

# Views go here!
@app.route('/')
def home():
    return 'you made it home, good job'


YOUR_DOMAIN = 'http://localhost:4000'

@app.route('/create-checkout-session/<int:id>', methods=['POST'])
def create_checkout_session(id):
    if not session['user_id']:
        return make_response({'error': 'You must be signed in to an account to make a purchase'}, 401)
    deck_to_purchase = Deck.query.get(id)
    user_transaction = session.get('user_id')
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price' : deck_to_purchase.stripe_price_id,
                    'quantity' : 1
                },
            ],
            mode='payment',
            client_reference_id = user_transaction,
            success_url=YOUR_DOMAIN + '/success',
            cancel_url=YOUR_DOMAIN + '/canceled',
        )
    except Exception as e:
        return make_response(str(e))
    
    return redirect(checkout_session.url, code=303)

endpoint_secret = environ.get('ENDPOINT_SECRET')

@app.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.get_data()
    sig_header = request.headers.get('Stripe_Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        raise e
    except stripe.error.SignatureVerificationError as e:
        raise e

    if event['type'] == 'checkout.session.completed':
        checkout_session = event['data']['object']
        data_for_db = Receipt()
        data_for_db.user_id = checkout_session.client_reference_id
        data_for_db.event_id = checkout_session.id
        if checkout_session.payment_status == 'paid':
            data_for_db.amount_paid = checkout_session.amount_total
        db.session.add(data_for_db)
        db.session.commit()
    else:
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)


def decks_login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        current_user = session.get('user_id')
        deck_to_edit = db.session.get(Deck, kwargs)
        # import ipdb; ipdb.set_trace()
        if not session['user_id'] or current_user != deck_to_edit.user_id:
            return make_response({'error': 'Unauthorized'}, 401)
        return func(*args, **kwargs)
    return decorated_function

class SignUp(Resource):
    def post(self):
        username = request.get_json()['username']
        email = request.get_json()['email']
        password_hash = request.get_json()['password_hash']
        profile_picture = request.get_json()['profile_picture']
        bio = request.get_json()['bio']
        
        if User.query.filter_by(email= email). first():
            return make_response({'Error': 'You already have an account. Try signing in.'})
        
        new_user = User(username=username, email=email, password_hash=generate_password_hash(password_hash, method='scrypt'), profile_picture=profile_picture, bio=bio)
        
        db.session.add(new_user)
        db.session.commit()
        
        session['user_id'] = new_user.id
        
        return make_response(jsonify('Account successfully created.'), 201)

api.add_resource(SignUp, '/signup')

class SignIn(Resource):
    def post(self):
        email = request.get_json()['email']
        password_hash = request.get_json()['password']
        
        existing_user = User.query.filter_by(email=email).first()
        
        if not existing_user or not check_password_hash(existing_user.password_hash, password_hash):
            return make_response('Email or password was incorrect. Please try again.', 404)
        
        session['user_id'] = existing_user.id
        return make_response(existing_user.to_dict())
    
api.add_resource(SignIn, '/signin')

class SignOut(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)
    
api.add_resource(SignOut, '/signout')

class CheckSession(Resource):
    def get(self):
        if user := User.query.filter(User.id == session.get('user_id')).first():
            return user.to_dict()
        else:
            return make_response({'message': '401: Not Authorized'}, 401)
        
api.add_resource(CheckSession, '/checksession')

class Decks(Resource):
    def get(self):
        decks = [deck.to_dict() for deck in Deck.query.all()]
        return make_response(jsonify(decks), 200)
    
    def post(self):
        if not session['user_id']:
            return make_response({'error': 'Unauthorized'}, 401)
        try:
            deck_data = request.get_json()
            deck = Deck(**deck_data)
            deck.user_id = session.get('user_id')
            db.session.add(deck)
            db.session.commit()
            new_product = stripe.Product.create(name=deck.deck_name)
            new_price = stripe.Price.create(
                unit_amount = (deck.price * 100),
                currency = 'usd',
                product = new_product.id
            )
            deck.stripe_product_id = new_product.id 
            deck.stripe_price_id = new_price.id 
            setattr(deck, 'stripe_product_id', deck.stripe_product_id)
            setattr(deck, 'stripe_price_id', deck.stripe_price_id)
            db.session.commit()
            return make_response(jsonify(deck.to_dict()), 201)
        except Exception as e:
            return make_response({'error': [str(e)]}, 400)

api.add_resource(Decks, '/decks')

class DecksById(Resource):
    def get(self, id):
        try:
            deck = Deck.query.get(id)
            return make_response(deck.to_dict(), 200)
        except Exception:
            return make_response({'error': 'Deck not found'}, 404)
    
    @decks_login_required
    def delete(self, id):
        try:
            deck = db.session.get(Deck, id)
            db.session.delete(deck)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception:
            return make_response({'error': 'deck not found'}, 404)
    
    @decks_login_required
    def patch(self, id):
        deck_by_id = db.session.get(Deck, id)
        if not deck_by_id:
            return make_response({'error': 'deck not found'}, 404)
        try:
            deck_data = request.get_json()
            for key in deck_data:
                setattr(deck_by_id, key, deck_data[key])
            db.session.commit()
            return make_response(deck_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({"error": [str(e)]}, 400)
        
api.add_resource(DecksById, '/decks/<int:id>')

class Spots(Resource):
    def get(self):
        spots = [spot.to_dict() for spot in Spot.query.all()]
        return make_response(jsonify(spots), 200)
    
    def post(self):
        try:
            spot_data = request.get_json()
            spot = Spot(**spot_data)
            spot.user_id = session.get('user_id')
            db.session.add(spot)
            db.session.commit()
            return make_response(jsonify(spot.to_dict()), 201)
        except Exception as e:
            return make_response({'error': [str(e)]}, 400)
            
api.add_resource(Spots, '/spots')

class SpotsById(Resource):
    def get(self, id):
        try:
            spot = Spot.query.get(id)
            return make_response(spot.to_dict(), 200)
        except Exception:
            return make_response({'error': 'Spot not found'}, 404)
    
    def delete(self, id):
        try:
            spot = db.session.get(Spot, id)
            db.session.delete(spot)
            db.session.commit()
            return make_response(jsonify({"Nothing to see here..."}), 204)
        except Exception:
            return make_response({'error': 'Spot not found'}, 404)
    
    def patch(self, id):
        spot_by_id = db.session.get(Spot, id)
        if not spot_by_id:
            return make_response({'error': 'Spot not found'}, 404)
        try:
            spot_data = request.get_json()
            for key in spot_data:
                setattr(spot_by_id, key, spot_data[key])
            db.session.commit()
            return make_response(spot_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({'error': [str(e)]}, 400)
        
api.add_resource(SpotsById, '/spots/<int:id>')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

api.add_resource(Users, '/users')
class UsersById(Resource):
    def get(self, id):
        try:
            user = User.query.get(id)
            return make_response(user.to_dict(), 200)
        except Exception:
            return make_response({'error': 'Account not found'}, 404)
        
    def patch(self, id):
        user_by_id = db.session.get(User, id)
        if not user_by_id:
            return make_response({'error': 'Account not found'})
        try:
            user_data = request.get_json()
            for key in user_data:
                setattr(user_by_id, key, user_data[key])
            db.session.commit()
            return make_response(user_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({'error': [str(e)]}, 400)
    
    def delete(self, id):
        try:
            user = db.session.get(User, id)
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        except Exception:
            return make_response({'error': 'Account not found'}, 404)
        
api.add_resource(UsersById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

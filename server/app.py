#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session, abort, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from models import *
from flask_restful import Resource

# Local imports
from config import app, db, api

# Views go here!
@app.route('/')
def home():
    return 'you made it home, good job'

class Decks(Resource):
    def get(self):
        decks = [deck.to_dict() for deck in Deck.query.all()]
        return make_response(jsonify(decks), 200)
    
    def post(self):
        if not session['user_id']:
            return make_response({'error': 'Unauthorized'}, 401)
        try:
            deck_data = request.get_json().get('deck')
            deck = Deck(**deck_data)
            db.session.add(deck)
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
        
    def delete(self, id):
        try:
            deck = db.session.get(Deck, id)
            db.session.delete(deck)
            db.session.commit()
            return make_response(jsonify({"Nothing to see here..."}), 204)
        except Exception:
            return make_response({'error': 'deck not found'}, 404)
        
    def patch(self, id):
        deck_by_id = db.session.get(Deck, id)
        if not deck_by_id:
            return make_response({'error': 'deck not found'}, 404)
        try:
            deck_data = request.get_json().get('deck')
            for key in deck_data:
                setattr(deck_by_id, key, deck_data[key])
            db.session.commit()
            return make_response(deck_by_id.to_dict(), 200)
        except Exception as e:
            return make_response({"error": [str(e)]}, 400)
api.add_resource(DecksById, '/decks/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

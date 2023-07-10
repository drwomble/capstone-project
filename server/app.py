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
            

if __name__ == '__main__':
    app.run(port=5555, debug=True)

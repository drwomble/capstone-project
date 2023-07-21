## Installation
1. Fork and clone this repo from Github into your local environment
2. Go into your local directory and open the contents in vscode or your preferred code editor.
3. Run `$ pipenv install` to install dependencies
4. Run `$ pipenv shell` to create a virtual environment
5. Run `$ cd server/` to enter the server directory

### .env set up
1. Create a `.env` file in the server directory
2. On line 1 write `SECRET_KEY=`
3. In the terminal run `$ python -c import secrets; print(secrets.token_hex())` 
4. Copy the resulting key from the terminal and paste it into your `.env` as the value of `SECRET_KEY`
5. Add `.env` to your `.gitignore` file.

### Start the database
1. Run `$ export FLASK_APP=app.py`
2. Run `$ flask db init`
3. Run `$ flask db upgrade`
4. Run `$ python3 seed.py` to seed the database

### Configuring Stripe
1. Go to [Stripe](https://stripe.com/) and create an account
2. Go to your dashboard and get your API test key
3. Go back into your `.env` file and create a line for `STRIPE_API_TEST_KEY`
4. Paste the test key from the Stripe dashboard as the value for `STRIPE_API_TEST_KEY` 

### Start the Server
1. Run `python3 app.py`

### Starting the Client
1. `$ cd client` in another terminal window
2. Run `$ npm install` to install dependencies
3. Run `$ npm start` to open the app in the browser

### Creator Links
[GitHub](https://github.com/drwomble) <br>
[Blog](https://dev.to/drew_womble)
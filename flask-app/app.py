from flask import Flask, g
from flask_cors import CORS
from routes.login import login_blueprint
import psycopg2

app = Flask(__name__)
# handling CORS
CORS(app)

# called before any request is sent
@app.before_request
def create_connection():
	try:
		if 'db' not in g:
			g.db = psycopg2.connect(dbname="hd",user="postgres",host="127.0.0.1")
	except (Exception, psycopg2.Error) as error:
		print("Could not create connection:", error)

@app.route('/')
def index():
	return "<p>Hello, World!</p>"

# sub route for /login
app.register_blueprint(login_blueprint)

# function called before request is closed
@app.teardown_appcontext
def teardown_db(exception):
	db = g.pop('db', None)
	if db is not None:
		db.close()

if __name__ == '__main__':
	app.debug = True
	app.run()
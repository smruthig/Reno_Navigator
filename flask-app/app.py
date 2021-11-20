from flask import Flask, g, request
from flask_cors import CORS
from routes.auth import auth_blueprint
from routes.customer import customer_blueprint
from routes.projectManager.projectManager import projectmanager_blueprint
import psycopg2

app = Flask(__name__)
# handling CORS
CORS(app)

# called before any request is sent
@app.before_request
def create_connection():
	try:
		designation = request.args.get('designation')
		if 'db' not in g:
			g.db = psycopg2.connect(dbname="hd", user=designation, password="1234",host="127.0.0.1")
			#g.db = psycopg2.connect(dbname="hd", user="projectmanager", password="1234",host="127.0.0.1")
	except (Exception, psycopg2.Error) as error:
		print("Could not create connection:", error)

@app.route('/')
def index():
	return "<p>Hello, World!</p>"

# sub route for /auth
app.register_blueprint(auth_blueprint)

# sub route for /projectManager
app.register_blueprint(projectmanager_blueprint)

app.register_blueprint(customer_blueprint)

# function called before request is closed
@app.teardown_appcontext
def teardown_db(exception):
	db = g.pop('db', None)
	if db is not None:
		db.close()

if __name__ == '__main__':
	app.debug = True
	app.run()
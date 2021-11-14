from flask import Flask 
from flask_cors import CORS
from routes.login import login_blueprint
from utils.postgres import psql_pool
import psycopg2

app = Flask(__name__)
# handling CORS
CORS(app)

try:
	conn = psql_pool.getconn()
except (Exception, psycopg2.Error) as error:
	print("Could not connect to PostgreSQL database:", error)

@app.route('/')
def index():
	return "<p>Hello, World!</p>"

# sub route for /login
app.register_blueprint(login_blueprint)

if __name__ == '__main__':
	app.debug = True
	app.run()
	# closing all connection and connection pool as cleanup step
	psql_pool.putconn(conn)
	psql_pool.closeall()
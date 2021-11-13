from flask import Flask, request, Response
from flask_cors import CORS
from operator import itemgetter
import psycopg2
from psycopg2.extras import RealDictCursor
import json

app = Flask(__name__)

CORS(app)

try:
	conn = psycopg2.connect("dbname=hd user=postgres host=127.0.0.1")
except (Exception, psycopg2.Error) as error:
	print("Could not connect to PostgreSQL database:", error)

cursor = conn.cursor(cursor_factory=RealDictCursor)

@app.route('/')
def index():
	return "<p>Hello, World!</p>"

@app.route('/login', methods=['POST'])
def login():
	if request.method == 'POST':
		data = request.json
		employee_id, password = itemgetter('employeeId','password')(data)
		cursor.execute("SELECT empemailid, empaddress FROM employee WHERE employeeid=%s",employee_id)
		x = json.dumps(cursor.fetchone())
		return Response(x)

if __name__ == '__main__':
	app.debug = True
	app.run()
	cursor.close()
	conn.close()
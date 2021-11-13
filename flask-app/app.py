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
	try:
		data = request.json
		email_id, password = itemgetter('emailId','password')(data)
		password = data['password']
		cursor.execute(f"SELECT emailid, password FROM useraccount WHERE emailid=\'{email_id}\'")
		res = cursor.fetchone()
		if res:
			# resjson = json.dumps(res,indent=4, sort_keys=True, default=str)
			if res["password"] == password:
				return Response(status=200)
			else:
				return Response(status=401)
		else:
			return Response(status=404)
	except:
		return Response(status=500)

if __name__ == '__main__':
	app.debug = True
	app.run()
	cursor.close()
	conn.close()
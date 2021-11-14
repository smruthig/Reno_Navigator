from flask import Blueprint, request, jsonify, Response
from operator import itemgetter
from utils.postgres import psql_pool
import psycopg2
from psycopg2.extras import RealDictCursor

login_blueprint = Blueprint('login', __name__)

try:
	conn = psql_pool.getconn()
except (Exception, psycopg2.Error) as error:
	print("Could not connect to PostgreSQL database:", error)

@login_blueprint.route('/login',methods=['POST'])
def login():
	try:
		data = request.json
		email_id, password = itemgetter('emailId','password')(data)
		password = data['password']

		cursor = conn.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT emailid, password FROM useraccount WHERE emailid=\'{email_id}\'")

		res = cursor.fetchone()
		
		if res:
			# resjson = json.dumps(res,indent=4, sort_keys=True, default=str)
			if res["password"] == password:
				cursor.execute(f"SELECT employeeid FROM employee WHERE empemailid=\'{email_id}\'")	
				res = cursor.fetchone()
				return jsonify(message="success",employeeId=res["employeeid"])
			else:
				return jsonify(message="incorrect password")
		else:
			return jsonify(message="no user")
	except:
		return Response(status=500)
	finally:
		cursor.close()
from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login',methods=['POST'])
def login():
	try:
		data = request.json
		email_id, password = itemgetter('emailId','password')(data)
		password = data['password']

		cursor = g.db.cursor(cursor_factory=RealDictCursor)

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

# function called before request is closed
@login_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
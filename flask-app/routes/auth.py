from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor
import psycopg2

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login',methods=['POST'])
def login():
	try:
		data = request.json
		email_id, password = itemgetter('emailId','password')(data)

		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT emailid, password FROM useraccount WHERE emailid=\'{email_id}\'")

		res = cursor.fetchone()
		
		if res:
			# resjson = json.dumps(res,indent=4, sort_keys=True, default=str)
			if res["password"] == password:
				cursor.execute(f"SELECT employeeid, designation FROM employee WHERE empemailid=\'{email_id}\'")	
				res = cursor.fetchone()
				if res["designation"]!='Sr Designer' and res["designation"]!='Jr Designer':
					return jsonify(message="success",employeeId=res["employeeid"],designation=res["designation"])
				else:
					return jsonify(message="success",employeeId=res["employeeid"],designation="designer")
			else:
				return jsonify(message="incorrect password")
		else:
			return jsonify(message="no user")
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	finally:
		cursor.close()

@auth_blueprint.route('/signup',methods=['POST'])
def signup():
	try:
		data = request.json
		name, email_id, password, address, designation, salary, dob, joindate  = itemgetter('name','emailId','password','address','designation','salary','dob','joindate')(data)
		salary = float(salary)
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"INSERT INTO employee (empname, empemailid, empaddress, designation, salary,dob,joindate) values(\'{name}\',\'{email_id}\',\'{address}\',\'{designation}\',\'{salary}\',\'{dob}\',\'{joindate}\')")
		
		cursor.execute(f"INSERT INTO useraccount (emailid, password) values(\'{email_id}\',\'{password}\')")
		g.db.commit()
		cursor.execute(f"SELECT employeeid, designation FROM employee WHERE empemailid=\'{email_id}\'")	
		res = cursor.fetchone()
		if res["designation"]!='Sr Designer' and res["designation"]!='Jr Designer':
			return jsonify(message="success",employeeId=res["employeeid"],designation=res["designation"])
		else:
			return jsonify(message="success",employeeId=res["employeeid"],designation="designer")
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	finally:
		cursor.close()

# function called before request is closed
@auth_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
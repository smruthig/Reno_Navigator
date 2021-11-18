from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor
import psycopg2

projectManager_blueprint = Blueprint('user', __name__)

# gets projectid of projects managed by given an employee id
@projectManager_blueprint.route('/projectmanager/<string:employee_id>')
def get_projects(employee_id):
	try:
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT p.projectID from project as p where p.projectID IN (SELECT projectID from managedBy as m where m.employeeID={employee_id});")
		res = cursor.fetchall()
		if res:
			# resjson = json.dumps(res,indent=4, sort_keys=True, default=str)
			return jsonify(res)
		else:
			return jsonify(message="no projects")
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(error,status=500)
	finally:
		cursor.close()

# creates a project also add record in managed by 
@projectManager_blueprint.route('/projectmanager/<string:employee_id>',methods=['POST'])
def post_project(employee_id):
	try:
		data = request.json
		print(data)

		# @TODO creates a project also add record in managed by and other tables

		return "hi"
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(error,status=500)
	# finally:
		# cursor.close()

# get project details given project_id
@projectManager_blueprint.route('/projectmanager/<string:employee_id>/<string:project_id>')
def get_project_by_id(employee_id,project_id):
	try:
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT * FROM project where projectid={project_id}")
		project = cursor.fetchone()

		cursor.execute(f"SELECT houseNo, street, pincode, city, state, length, breadth from sitedetails where siteid={project['siteid']}")
		site = cursor.fetchall()

		cursor.execute(f"SELECT customerName, customerPhNo, customerEmailID, customerAddress from customer where customerid={project['customerid']}")
		customer = cursor.fetchall()

		cursor.execute(f"SELECT customerid, feedback, feedbackdate, rating FROM customerfeedback where projectid={project_id} AND customerid={project['customerid']};")
		customer_feedback = cursor.fetchall()

		# @TODO designers and contractors
		# cursor.execute(f"SELECT employeeid, empemailid FROM employee, designedby where designedby.projectid={project_id} AND designedby.employeeid=employee.employeeid;")
		# designer = cursor.fetchall()

		# @TODO Rooms & Designs in project

		
		return jsonify(project=project,site=site,customer=customer,customerFeedback=customer_feedback)
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(error,status=500)
	# finally:
		# cursor.close()

# gets all customerids for creating a project form
@projectManager_blueprint.route('/projectmanager/getallcustomerids')
def get_all_customer_ids():
	try:
		# @TODO return all customer ids
		return jsonify()
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	# finally:
		# cursor.close()

# function called before request is closed
@projectManager_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
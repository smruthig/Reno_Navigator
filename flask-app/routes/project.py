from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor
import psycopg2

project_blueprint = Blueprint('user', __name__)

# gets details of projects managed by the user given an employee id
@project_blueprint.route('/project')
def get_projects():
	try:
		employee_id = request.args.get('employee_id')
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT * from project as p where p.projectID IN (SELECT projectID from managedBy as m where m.employeeID={employee_id});")

		res = cursor.fetchall()
		print(res)
		if res:
			# resjson = json.dumps(res,indent=4, sort_keys=True, default=str)
			return jsonify(res)
		else:
			return jsonify(message="no projects")
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	finally:
		cursor.close()

#@TODO creates a project also add record in managed by 
@project_blueprint.route('/project',methods=['POST'])
def post_project():
	try:
		employee_id = request.args.get('employee_id')
		data = request.json
		print(data)
		return "hi"
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	# finally:
		# cursor.close()

# @TODO get project details given project_id
@project_blueprint.route('/project/<string:project_id>')
def get_project_by_id(project_id):
	try:
		return "hi"
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	# finally:
		# cursor.close()

# function called before request is closed
@project_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
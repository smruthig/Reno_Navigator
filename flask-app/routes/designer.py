from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor
import psycopg2

designer_blueprint = Blueprint('designer', __name__)

# gets projectid of projects managed by given an employee id
@designer_blueprint.route('/designer/<string:employee_id>')
def get_projects(employee_id):
	try:
		cursor = g.db.cursor(cursor_factory=RealDictCursor)
		print("!")
		cursor.execute(f"SELECT p.projectID from project as p WHERE p.projectID IN (SELECT projectID from designedBy as m WHERE m.employeeID={employee_id});")
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

# get project details given project_id
@designer_blueprint.route('/designer/<string:employee_id>/<string:project_id>')
def get_project_by_id(employee_id,project_id):
	try:
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT * FROM project where projectid={project_id}")
		project = cursor.fetchone()

		cursor.execute(f"SELECT houseNo, street, pincode, city, state, length, breadth from sitedetails where siteid={project['siteid']}")
		site = cursor.fetchone()

		cursor.execute(f"SELECT roomid, roomname, roomsize, designid, productid, typename, productcost, description from (SELECT * from (SELECT * from hasRoom natural join room WHERE projectID={project_id}) as x natural join designIncludesProducts) as y natural join product;")
		des_for_rooms = cursor.fetchall()
		
		return jsonify(project=project,site=site, des_for_rooms=des_for_rooms)
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(error,status=500)
	finally:
		cursor.close()

# function called before request is closed
@designer_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
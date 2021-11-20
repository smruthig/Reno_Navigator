from flask import Blueprint, request, jsonify, Response, g
from operator import itemgetter
from psycopg2.extras import RealDictCursor
import psycopg2

customer_blueprint = Blueprint('customer', __name__)

# gets all customerids for creating a project form
@customer_blueprint.route("/getallcustomers")
def get_all_customer_ids():
	try:
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"SELECT customerid,customername FROM customer ORDER BY customername;")	
		customer = cursor.fetchall()
		return jsonify(customer)
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(error,status=500)
	finally:
		cursor.close()

@customer_blueprint.route("/createcustomer",methods=['POST'])
def createcustomer():
	try:
		data = request.json

		customername, customerphoneno, customeraddress, customeremailid  = itemgetter('customername','customerphoneno','customeraddress','customeremailid')(data)
		
		cursor = g.db.cursor(cursor_factory=RealDictCursor)

		cursor.execute(f"INSERT INTO customer (customername, customerphno, customeremailid, customeraddress) values(\'{customername}\',\'{customerphoneno}\',\'{customeremailid}\',\'{customeraddress}\');")
		
		g.db.commit()
		cursor.execute(f"SELECT customerid, customername FROM customer WHERE customername=\'{customername}\';")	
		res = cursor.fetchone()
		return jsonify(res)
	except(Exception, psycopg2.Error) as error:
		print(error)
		return Response(status=500)
	finally:
		cursor.close()
	

# function called before request is closed
@customer_blueprint.teardown_app_request
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
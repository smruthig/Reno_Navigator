import psycopg2
from psycopg2 import pool

try:
	psql_pool = pool.ThreadedConnectionPool(1, 4, dbname="hd",user="postgres",host="127.0.0.1")
except (Exception, psycopg2.Error) as error:
	print("Could not create connection pool:", error)
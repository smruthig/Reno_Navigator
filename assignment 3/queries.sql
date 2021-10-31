
-- Projects designed by a particular designer
SELECT * FROM designedBy AS d WHERE employeeID=20;

 
-- Site details 

SELECT * FROM (project AS p JOIN designedBy AS d ON p.projectID=d.projectID AND employeeID=12)) NATURAL JOIN siteDetails;

---> proj
-->room
-->designed


---ADMIN

--Select all projects
SELECT * FROM projects;

--List siteDetails of all projs

SELECT * FROM (project as p JOIN siteDetails as s ON p.siteID=s.site;

--> Customer
SELECT * FROM (project as p JOIN customer as c ON p.customerID=c.customerID);

SELECT * FROM (project as p JOIN payment as py ON p.projectID=py.projectID);

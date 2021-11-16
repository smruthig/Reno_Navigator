-- Simple queries

-- List of all customer feedbacks for project with projectID=10
select * from customerFeedback where projectID=10;

-- Site details for every project
SELECT * FROM projects AS p, siteDetails AS s WHERE p.siteID = s.siteID;

-- Projects designed by a particular designer
SELECT * FROM designedBy AS d WHERE employeeID=20;

-- Payment details for all projects
SELECT * FROM (project as p JOIN payment as py ON p.projectID=py.projectID);

-- Details of sites managed by project managers
SELECT * FROM managedBy AS m, project AS proj, siteDetails AS site WHERE m.projectID = proj.projectID AND proj.siteID = site.siteID;

-- Total profit made by the company
SELECT SUM (profit) AS total FROM payment;




-- Complex queries

-- details of all projects managed by project manager with ID=5
SELECT * from project as p where p.projectID IN (SELECT projectID from managedBy as m where m.employeeID=5);

-- List of rooms in a project with projectID=2 with respective designs and products used in each design
select * from (select * from (select * from hasRoom natural join room where projectID=2) as x natural join designIncludesProducts) as y natural join product;

-- List of contractors for a project with projectID=4
select * from contractor where contractorID IN (select contractorID from works where projectID=4);

-- Details of designers who are working on less than 2 projects, so that they can be assigned to new projects
select * from employee where employeeID IN (select employeeID from (select employeeID, count(projectID) from designedBy group by employeeID) AS x where count<2);

-- Site details 
SELECT * FROM (project AS p JOIN designedBy AS d ON p.projectID=d.projectID AND employeeID=12) NATURAL JOIN siteDetails;

--  added newly
SELECT * FROM ( select * from project NATURAL JOIN customer WHERE projectid=1) as foo NATURAL JOIN siteDetails;
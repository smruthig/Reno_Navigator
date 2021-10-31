-- PROJECT MANAGER

-- details of all projects managed by project manager with ID=5
SELECT * from project as p where p.projectID IN (SELECT projectID from managedBy as m where m.employeeID=5);

-- customer details for a project with projectID 10
select * from customer where customerID IN (select customerID from project where projectID=10);

-- List of rooms in a project with projectID=2 with respective designs and products used in each design
select * from hasRoom natural join room where projectID=2;

-- List of contractors for a project with projectID=4
-- List of designers working on a project
-- List of designer who are working on less than 2 projects
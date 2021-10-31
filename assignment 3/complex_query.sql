-- PROJECT MANAGER

-- details of all projects managed by project manager with ID=5
SELECT * from project as p where p.projectID IN (SELECT projectID from managedBy as m where m.employeeID=5);

-- customer details for a project with projectID 10
select * from customer where customerID IN (select customerID from project where projectID=10);

-- List of rooms in a project with projectID=2 with respective designs and products used in each design
select * from (select * from (select * from hasRoom natural join room where projectID=2) as x natural join designIncludesProducts) as y natural join product;

-- List of contractors for a project with projectID=4
select * from contractor where contractorID IN (select contractorID from works where projectID=4);

-- Details of designers who are working on less than 2 projects
select * from employee where employeeID IN (select employeeID from (select employeeID, count(projectID) from designedBy group by employeeID) AS x where count<2);

-- List of all customer feedbacks for project with projectID=10
select * from customerFeedback where projectID=10;
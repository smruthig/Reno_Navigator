create table project(
	projectID serial,
	siteID int not null,
	customerID int not null,
	startDate date,
	estimatedEndDate date check(estimatedEndDate > startDate),
	primary key (projectID)
);

create table employee(
	employeeID serial,
	empEmailID varchar(30),
	empAddress text,
	designation varchar(30),
	salary decimal check (salary > '15000'),
	dob date check(date_part('year',AGE(CURRENT_DATE,dob))>18),
	joinDate date check(joinDate > dob),
	projectID int,
	primary key (employeeID),
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE SET NULL ON UPDATE CASCADE
);

create table managedBy(
	projectID int,
	employeeID int,
	primary key(projectID,employeeID),
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(employeeID) REFERENCES employee(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table empPhNo(
	employeeID int,
	empPhNo varchar(10) unique,
	primary key(employeeID,empPhNo),
	FOREIGN KEY(employeeID) REFERENCES employee(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table designedBy(
	projectID int,
	employeeID int,
	primary key(projectID,employeeID),
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(employeeID) REFERENCES employee(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table customer(
	customerID serial primary key,
	customerName varchar(30),
	customerPhNo varchar(10),
	customerEmailID varchar(30),
	customerAddress text
);

create table customerFeedback(
	customerID int,
	projectID int,
	feedback text,
	feedbackDate date,
	rating numeric(1) check (rating>=1 and rating<=5),
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(customerID) REFERENCES customer(customerID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- project has many rooms, for each room a customer selects a design
-- design for a specific room,
create table design(
	designID serial,
	designCost decimal check (designCost>0),
	primary key (designID)
);

-- details of a room like a large kitchen, small bathroom etc specific to a project[See next table]
create table room(
	roomID serial,
	-- kitchen, hall, bathroom
	roomName varchar(30) not null,
	roomSize char check(roomSize IN('S','M','L')),
	designID int,
	primary key (roomID),
	FOREIGN KEY(designID) REFERENCES design(designID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- maps rooms and a project
create table hasRoom(
	projectID int,
	roomID int,
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(roomID) REFERENCES room(roomID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table product(
	productID serial,
	typeName varchar(30),
	-- for which room is this product
	roomName varchar(30),
	productCost decimal check(productCost>0),
	description text not null,
	primary key (productID)
);

-- list of products used in a design
create table designIncludesProducts(
	designID int,
	productID int,
	primary key (designID,productID),
	FOREIGN KEY(designID) REFERENCES design(designID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(productID) REFERENCES product(productID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table siteDetails(
	siteID serial,
	houseNo varchar(10) not null,
	street text not null,
	pincode varchar(6) not null,
	city varchar(30) not null,
	state varchar(10),
	length decimal not null check(length>0),
	breadth decimal not null check(breadth>0),
	primary key(siteID)
);

create table payment(
	costPrice decimal check(costPrice>0),
	-- removed minimum profit percentage as products could be sold at loss
	sellingPrice decimal check(sellingPrice>0 and costPrice>0),
	advancePaid decimal check(advancePaid< sellingPrice),
	profit decimal check(profit > 0),
	projectId int not null,
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table contractor(
	contractorID serial,
	contractorName varchar(30) not null,
	typeOfWork varchar(30) not null,
	contractorEmail varchar(30),
	primary key (contractorID)
);

create table contractorPhNo(
	contractorID int,
	contractorPhNo varchar(12) unique,
	primary key(contractorID,contractorPhNo),
	FOREIGN KEY(contractorID) REFERENCES contractor(contractorID) ON DELETE CASCADE ON UPDATE CASCADE
);

create table works(
	contractorID int,
	projectID int,
	primary key(contractorID,projectID),
	FOREIGN KEY(projectID) REFERENCES project(projectID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(contractorID) REFERENCES contractor(contractorID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- company sells products
create table company(
	companyID serial,
	companyName varchar(30) not null,
	companyEmailID varchar(30),
	companyAddress text,
	primary key (companyID)
);

create table companyPhNo(
	companyID int,
	companyPhNo varchar(12) unique,
	primary key (companyID,companyPhNo),
	FOREIGN KEY(companyID) REFERENCES company(companyID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- details of which company sells which product
create table sells(
	companyID int,
	productID int,
	primary key (companyID,productID)
);

alter table project
ADD FOREIGN KEY(siteID) REFERENCES SiteDetails(siteID) ON DELETE RESTRICT ON UPDATE CASCADE;

alter table project
ADD FOREIGN KEY(customerID) REFERENCES customer(customerID) ON DELETE SET NULL ON UPDATE CASCADE;

create table useraccount(
	employeeID int,
	password varchar(30),
	FOREIGN KEY(employeeID) references employee(employeeID) ON DELETE CASCADE ON UPDATE CASCADE
)
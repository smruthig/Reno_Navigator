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
	FOREIGN KEY(projectID) REFERENCES project(projectID)
);

create table empPhNo(
	employeeID int,
	empPhNo varchar(10) unique,
	primary key(employeeID,empPhNo),
	FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

create table designedBy(
	projectID int,
	employeeID int,
	primary key(projectID,employeeID),
	FOREIGN KEY(projectID) REFERENCES project(projectID),
	FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

create table customer(
	customerID serial primary key,
	customerName varchar(30),
	cutomerPhno varchar(10),
	customerEmailID varchar(30),
	customerAddress text
);

create table customerFeedback(
	customerID int,
	projectID int,
	feedback text,
	feedbackDate date,
	rating numeric(1) check (rating>=1 and rating<=5),
	FOREIGN KEY(projectID) REFERENCES project(projectID),
	FOREIGN KEY(customerID) REFERENCES customer(customerID)
);

create table design(
	designID serial,
	designCost decimal check (designCost>0),
	size char check(size IN ('S','M','L')),
	primary key (designID)
);

create table room(
	roomID serial,
	roomName varchar(30) not null,
	roomSize char check(roomSize IN('S','M','L')),
	designID int,
	primary key (roomID),
	FOREIGN KEY(designID) REFERENCES design(designID)
);

create table hasRoom(
	projectID int,
	roomID int,
	FOREIGN KEY(projectID) REFERENCES project(projectID),
	FOREIGN KEY(roomID) REFERENCES room(roomID)
);

create table product(
	productID serial,
	typeName varchar(30),
	roomName varchar(30),
	productCost decimal check(productCost>0),
	description text not null,
	primary key (productID)
);

create table designIncludesProducts(
	designID int,
	productID int,
	primary key (designID,productID),
	FOREIGN KEY(designID) REFERENCES design(designID),
	FOREIGN KEY(productID) REFERENCES product(productID)
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
	sellingPrice decimal check(sellingPrice>0 and sellingPrice > costPrice),
	advancePaid decimal check(advancePaid< sellingPrice),
	profit decimal check(profit > 0),
	projectId int not null,
	FOREIGN KEY(projectID) REFERENCES project(projectID)
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
	contractorPhNo varchar(10) unique,
	primary key(contractorID,contractorPhNo),
	FOREIGN KEY(contractorID) REFERENCES contractor(contractorID)
);

create table works(
	contractorID serial,
	projectID int,
	primary key(contractorID,projectID),
	FOREIGN KEY(projectID) REFERENCES project(projectID),
	FOREIGN KEY(contractorID) REFERENCES contractor(contractorID)
);

create table company(
	companyID serial,
	companyName varchar(30) not null,
	companyEmailID varchar(30),
	companyAddress text,
	primary key (companyID)
);

create table companyPhNo(
	companyID int,
	companyPhNo varchar(10) unique,
	primary key (companyID,companyPhNo),
	FOREIGN KEY(companyID) REFERENCES company(companyID)
);

create table sells(
	companyID int,
	productID int,
	primary key (companyID,productID)
);

alter table project
ADD FOREIGN KEY(siteID) REFERENCES SiteDetails(siteID); 

alter table project
ADD FOREIGN KEY(customerID) REFERENCES customer(customerID); 

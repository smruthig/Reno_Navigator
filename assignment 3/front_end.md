# 3 users
1. employee
2. admin
3. company manager

## Employee
1. Project manager
	1. List of his/her projects(+ button)
		1. Details of the project like site details, end date
		2. Customer details
		3. Rooms with their designs
			1. Products in every design
		5. List of contractors working for the project(+ button)
		6. List of designers working on the project(+ button)
		7. See customer feedbacks

2. Designer
	1. List of his/her projects(+ button)
		1. Details of the project like site details 
		2. Rooms with their designs(+ button)
			1. Products in every design

3. Admin
	1. List of all projects(+ button)
		1. Details of the project like site details
		2. Customer details
		3. Rooms with their designs(+ button)
			1. Products in every design
		5. List of contractors working for the project(+ button)
		6. List of designers working on the project(+ button)
	2. List of all products & company details(+ button)
	3. See all customer feedbacks
	4. Payment details per project

4. Company manager
	1. List of all products(+ button)
		1. List of companies which sell a particular product(+ button)

5. Accountant
	1. List of projects
		1. Customer details
		2. Payment details(+ button)
	2. Overall company revenue








1. Project manager
	project
	employee
	managedBy
	empPhNo
	designedBy
	customer
	customerFeedback
	design
	room
	hasRoom
	product
		can't update productCost
	designIncludesProducts
	siteDetails
	contractor
	contractorPhNo
	works

2. Designer
	project
	siteDetails
	design
	room
	hasRoom
	product
	designIncludesProducts
	customer
		select, update(phNo,customerEmailID)

3. Admin

4. Company manager
	product
	company
	companyPhNo
	sells

5. Accountant
	project
	customer
	payment
	product
		select(productID, productCost) update(productCost)
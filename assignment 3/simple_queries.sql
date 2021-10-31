-- 1. DESIGNER:
	SELECT * FROM designedBy AS des, project AS proj, siteDetails AS site,  
	design AS d, room AS r, hasRoom AS hr, designIncludesProducts AS dip,
	product AS prod
	WHERE des.projectID = proj.projectID
	AND proj.siteID = site.siteID
	AND hr.projectID = proj.projectID
	AND hr.roomID = r.roomID 
	AND r.designID = d.designID
	AND dip.designID = d.designID
	AND prod.productID = dip.productID;

	-- Or do we need to split this into 3 different queries?
	
-- 2. PROJECT MANAGER
--a.
	SELECT * FROM managedBy AS m, project AS proj, siteDetails AS site 
	WHERE m.projectID = proj.projectID
	AND proj.siteID = site.siteID;
-- b.  
	SELECT projectID, customerID, customerName, customerPhNo, customerEmailID, customerAddress from
	project as proj, customer as cust, managedBy as m 
	WHERE m.projectID = proj.projectID
	AND proj.customerID = cust.customerID;
-- c.	
	SELECT * FROM managedBy AS m, project AS proj,  
	design AS d, room AS r, hasRoom AS hr, designIncludesProducts AS dip,
	product AS prod
	WHERE m.projectID = proj.projectID
	AND hr.projectID = proj.projectID
	AND hr.roomID = r.roomID 
	AND r.designID = d.designID
	AND dip.designID = d.designID
	AND prod.productID = dip.productID;
 
-- 3. ADMIN
-- a. 
	SELECT * FROM projects AS p, siteDetails AS s WHERE p.siteID = s.siteID;
-- b. 
	SELECT * FROM customer;


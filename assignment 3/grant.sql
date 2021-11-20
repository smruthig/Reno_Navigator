GRANT ALL ON DATABASE hd to admin;

GRANT all on project, managedBy, designedBy, room, hasRoom, siteDetails, contractor, contractorPhNo, works to projectmanager;
Grant select on employee, product, empPhNo, customer, customerFeedback, design, designIncludesProducts to projectmanager;
Grant insert on customer to projectmanager;
Grant usage, select on customer_customerid_seq, project_projectid_seq, project_siteid_seq, sitedetails_siteid_seq to projectmanager;

GRANT select on project, hasRoom, product, siteDetails to designer;
GRANT all on design, designIncludesProducts to designer;
Grant select, update(designID) on room to designer;

GRANT all on product, company, companyPhNo, sells to companymanager;

GRANT select on project, customer to accountant;
GRANT all on payment to accountant;
GRANT select(productID, productCost), update(productCost) on product to accountant;
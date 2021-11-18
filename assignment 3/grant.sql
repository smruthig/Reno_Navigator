GRANT ALL ON DATABASE hd to admin;

GRANT all on project, managedBy, designedBy, room, hasRoom, siteDetails, contractor, contractorPhNo, works to projectmanager;
Grant select on employee, product, empPhNo, customer, customerFeedback, design, designIncludesProducts to projectmanager;

GRANT select on project, hasRoom, product, siteDetails to designer;
GRANT all on design, designIncludesProducts to designer;
Grant select, update(designID) on room to designer;

GRANT all on product, company, companyPhNo, sells to companymanager;

GRANT select on project, customer to accountant;
GRANT all on payment to accountant;
GRANT select(productID, productCost), update(productCost) on product to accountant;
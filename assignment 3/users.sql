GRANT ALL ON DATABASE hd to admin

GRANT all on project, managedBy, designedBy, room, hasRoom, siteDetails, contractor, contractorPhNo, works to projectManager
Grant select on employee, product, empPhNo, customer, customerFeedback, design, designIncludesProducts to projectManager

GRANT select on project, hasRoom, product, siteDetails to designer
GRANT all on design, designIncludesProducts to designer
Grant select, update(designID) on room to designer

GRANT all on product, company, companyPhNo, sells to companyManager

GRANT select on project, customer to accountant
GRANT all on payment to accountant
GRANT select(productID, productCost), UPDATE(productCost) to accountant
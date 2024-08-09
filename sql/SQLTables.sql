CREATE TABLE Doctor(	
DoctorID int NOT NULL,
fName CHAR(100),
mName CHAR(100),
lName CHAR(100),
FaxNumber INT,
Institute CHAR(100),
Primary KEY(DoctorID)
);


CREATE TABLE PrescriptionDrug(	
Pname CHAR(100) NOT NULL,
ExpirationDate DATE,
Strength CHAR(100),
DrugInteraction CHAR(100),
AmountAvailable INT,
Primary KEY(Pname)
);


CREATE TABLE Pharmacist(	
PharmacistID INT NOT NULL,
fName CHAR(100),
mName CHAR(100),
lName CHAR(100),
Password CHAR(100),
Primary KEY(PharmacistID)
);


CREATE TABLE Customer(	
CustomerID INT  NOT NULL,
fName CHAR(100),
mName CHAR(100),
lName CHAR(100),
DrugInteraction CHAR(100),
Allergies CHAR(100),
Active CHAR(30),
PRIMARY KEY(CustomerID)
);


CREATE TABLE Prescription(
PrescriptionID INT NOT NULL, 
Pname CHAR(100) NOT NULL,
PharmacistID INT NOT NULL, 
AmountPrescribed INT, 
DosageInstructions CHAR(100), 
Pdate DATE, 
LengthOfPrescription date,
PRIMARY KEY (PrescriptionID),
FOREIGN KEY (Pname) REFERENCES PrescriptionDrug(Pname),
FOREIGN KEY (PharmacistID) REFERENCES Pharmacist(PharmacistID)
);


CREATE TABLE CustomerOrder(
OrderID INT NOT NULL, 
Odate DATE, 
Subtotal INT, 
NoOfPrescriptions INT, 
PrescriptionID INt NOT NULL, 
CustomerID INT NOT NULL,
PRIMARY KEY (OrderID),
FOREIGN KEY (PrescriptionID) REFERENCES Prescription(PrescriptionID),
FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);


CREATE TABLE Payment(
PaymentType CHAR(30),
OrderID INT,
PRIMARY KEY (PaymentType),
FOREIGN KEY (OrderID) REFERENCES CustomerOrder(OrderID)
);
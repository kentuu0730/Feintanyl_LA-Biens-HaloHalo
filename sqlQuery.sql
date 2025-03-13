-- Create Database
CREATE DATABASE LA_inventory_system;
USE LA_inventory_system;

-- Categories Table
CREATE TABLE Categories (
    Category_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Products Table
CREATE TABLE Products (
    Product_ID INT AUTO_INCREMENT PRIMARY KEY,
    Category_ID INT,
    Name VARCHAR(255) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (Category_ID) REFERENCES Categories(Category_ID)
);

-- Ingredients Table
CREATE TABLE Ingredients (
    Ingredient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Cost_Per_Unit DECIMAL(10,2),
    Unit_Of_Measure VARCHAR(50),
    QTY INT
);

-- Products_Ingredients Table (Many-to-Many Relationship)
CREATE TABLE Products_Ingredients (
    Product_ID INT,
    Ingredient_ID INT,
    Quantity INT,
    Price DECIMAL(10,2),
    PRIMARY KEY (Product_ID, Ingredient_ID),
    FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID),
    FOREIGN KEY (Ingredient_ID) REFERENCES Ingredients(Ingredient_ID)
);

-- Inventory Table
CREATE TABLE Inventory (
    Inventory_ID INT AUTO_INCREMENT PRIMARY KEY,
    Product_ID INT,
    Quantity INT,
    Price DECIMAL(10,2),
    Expiration_Date DATE,
    FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID)
);

-- Supplier Table
CREATE TABLE Supplier (
    Supplier_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Address TEXT,
    Phone_Number VARCHAR(15),
    Email VARCHAR(100)
);

-- Supplies Table
CREATE TABLE Supplies (
    Supply_ID INT AUTO_INCREMENT PRIMARY KEY,
    Supplier_ID INT,
    Total DECIMAL(10,2),
    Employee_ID INT,
    Purchase_Date DATE,
    FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
);

-- Discount Table (Moved Above Sales to Fix Foreign Key Issue)
CREATE TABLE Discount (
    Discount_ID INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(50),
    Discount_Percentage DECIMAL(5,2)
);

-- Sales Table
CREATE TABLE Sales (
    Sales_ID INT AUTO_INCREMENT PRIMARY KEY,
    Discount_ID INT,
    Total DECIMAL(10,2),
    Employee_ID INT,
    Purchase_Date DATE,
    FOREIGN KEY (Discount_ID) REFERENCES Discount(Discount_ID)
);

-- Supply Details Table (Product-Based)
CREATE TABLE Supply_Details (
    Supply_ID INT,
    Product_ID INT,
    Supply_Price DECIMAL(10,2),
    Quantity INT,
    SubTotal DECIMAL(10,2),
    PRIMARY KEY (Supply_ID, Product_ID),
    FOREIGN KEY (Supply_ID) REFERENCES Supplies(Supply_ID),
    FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID)
);

-- Supply Details Table (Inventory-Based)
CREATE TABLE Supply_Details_Inventory (
    Supply_ID INT,
    Inventory_ID INT,
    Supply_Price DECIMAL(10,2),
    Quantity INT,
    SubTotal DECIMAL(10,2),
    PRIMARY KEY (Supply_ID, Inventory_ID),
    FOREIGN KEY (Supply_ID) REFERENCES Supplies(Supply_ID),
    FOREIGN KEY (Inventory_ID) REFERENCES Inventory(Inventory_ID)
);

-- Stock Employee Table
CREATE TABLE Stock_Employee (
    Employee_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Address TEXT,
    Phone_Number VARCHAR(15),
    Email VARCHAR(100)
);

-- Sales Details Table
CREATE TABLE Sales_Details (
    Sales_ID INT,
    Product_ID INT,
    Sales_Price DECIMAL(10,2),
    Quantity INT,
    SubTotal DECIMAL(10,2),
    Date DATE,
    PRIMARY KEY (Sales_ID, Product_ID),
    FOREIGN KEY (Sales_ID) REFERENCES Sales(Sales_ID),
    FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID)
);

-- Payment Table
CREATE TABLE Payment (
    Payment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Sales_ID INT,
    Reference_Number VARCHAR(50),
    FOREIGN KEY (Sales_ID) REFERENCES Sales(Sales_ID)
);

-- Payment Type Table
CREATE TABLE Payment_Type (
    Payment_ID INT PRIMARY KEY,
    Payment_Type VARCHAR(50),
    FOREIGN KEY (Payment_ID) REFERENCES Payment(Payment_ID)
);

-- Stock Out Table
CREATE TABLE Stock_Out (
    Stock_Out_ID INT AUTO_INCREMENT PRIMARY KEY,
    Total DECIMAL(10,2),
    Employee_ID INT,
    Stockout_Date DATE
);

-- Stock Out Details Table
CREATE TABLE Stock_Out_Details (
    Stock_Out_ID INT,
    Product_ID INT,
    Sales_Price DECIMAL(10,2),
    Quantity INT,
    SubTotal DECIMAL(10,2),
    Description TEXT,
    PRIMARY KEY (Stock_Out_ID, Product_ID),
    FOREIGN KEY (Stock_Out_ID) REFERENCES Stock_Out(Stock_Out_ID),
    FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID)
);
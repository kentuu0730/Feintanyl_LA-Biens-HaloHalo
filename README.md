# Feintanyl_LA-Biens-HaloHalo

Here’s the step-by-step instruction for setting up your LA Inventory System:

---

### 1. *Install Dependencies*
   Open your terminal and navigate to your project directory, then run the following command to install all necessary dependencies:

   
   npm install
   

---

### 2. *Set up the Database*
   1. Open *XAMPP* and start the *Apache* and *MySQL* services.
   2. Open *phpMyAdmin* (usually accessible at http://localhost/phpmyadmin).
   3. Run the following SQL queries to set up your database and tables:

   
   -- Create the database
   create database LA_inventory_system;

   -- Use the database
   use LA_inventory_system;

   -- Create the 'products' table
   create table products (
       product_id int primary key auto_increment,
       category varchar(255),
       name varchar(255),
       price decimal(10,2),
       quantity int,
       expiration_date date
   );

   -- Insert sample data into the 'products' table
   insert into products (category, name, price, quantity, expiration_date) 
   values ("Dessert", "Halo Halo", 110, 20, "2025-10-20");

   -- Create the 'employees' table
   create table employees (
       employee_id int primary key auto_increment,
       name varchar(255),
       address varchar(255),
       phone_number varchar(15),
       password varchar(255),
       email varchar(50),
       role varchar(50)
   );

   -- Create the 'suppliers' table
   create table suppliers (
       supplier_id int primary key auto_increment,
       name varchar(50),
       address varchar(255),
       phone_number varchar(15),
       email varchar(50)
   );

   -- Select all data from the 'products' table to verify it's set up
   select * from products;
   

---

### 3. *Start the Server*
   After setting up the database, navigate to your project folder in the terminal, and start the Node.js server with the following command:

   
   node server.js
   

---

### 4. *Send a POST Request to Register an Employee*
   1. Open *Postman*.
   2. Send a *POST* request to the following endpoint:  
   http://localhost:5000/api/employees/register
   
   3. Set the request body type to *raw* and select *JSON*.
   4. In the body, send the following JSON to register an employee:

   
   {
     "name": "Lebron James",
     "address": "123 Main St",
     "phone": "09172839942",
     "email": "me@ngsss.dev",
     "password": "123123zxc",
     "role": "admin"
   }
   

---

### 5. *Access the Application*
   Open your browser and visit http://localhost:5000 to access your application.

---

Now you're all set up! You can interact with the system via Postman for APIs and check the site in your browser.

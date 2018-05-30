-- Drop the database if it exists --
DROP DATABASE IF EXISTS bamazon_db;

-- Create a MySQL Database called bamazon --
CREATE DATABASE bamazon_db;

-- Apply this program to bamazon_db --
USE bamazon_db;

-- Then create a Table inside of that database called products --
CREATE TABLE products (
-- The products table should have each of the following columns:--

-- item_id (unique id for each product) --
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
-- product_name (Name of product) --
	product_name VARCHAR(30) NOT NULL,
-- department_name --
	department_name VARCHAR(30) NOT NULL,
-- price (cost to customer) --
	price DECIMAL(10,2) NOT NULL,
-- stock_quantity (how much of the product is available in stores) --
	quantity INTEGER(10) NOT NULL,

	PRIMARY KEY (id)
); -- end of products table --


-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table). --

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Smartphone", "electronics", 749.99, 20);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Mountain Bike", "sporting", 675.49, 10);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Motorcycle", "vehicles", 7250.00, 6);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Digital Camera", "cameras", 439.99, 15);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Playstation 4", "gaming", 199.95, 3);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Coffee Maker", "applicances", 99.85, 5);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Garden Gnome", "garden", 12.50, 35);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Computer Desk", "office", 129.00, 17);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Couch", "furniture", 200.00, 8);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Laptop", "computers", 1245.99, 10);

SELECT * FROM bamazon_db.products;
-- end of schema --

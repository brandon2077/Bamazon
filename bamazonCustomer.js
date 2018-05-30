// Grab the required npm packages here
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to the database using mysql.createConnection and storing it into a variable
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "mypass",
	database: "bamazon_db"
});

// If connection is successful, run afterConnection(), else throw an err
connection.connect(function(err) {
	if (err) throw err;
	console.log("Welcome to Bamazon!");
	console.log("------------------------------------------");
	queryProducts();
});

// Query the database, select "products" table, and grab the response
// Display all of the items available for sale
// Include the ids, names, and prices of products for sale
function queryProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		 for (var i = 0; i < res.length; i++) {
			 console.log("Product ID: " + res[i].id + " | " + "Product Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "In Stock: " + res[i].quantity);
		}; // end of products loop

// Run buy() function to begin the prompt after displaying the products
	console.log("------------------------------------------");
	buy(res);
	
	}); // end of connection query
} // end of queryProducts() function

// Prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
function buy(res) {
// First prompt the user for the product ID
	inquirer.prompt([
		{
			name: "productId",
			type: "input",
			message: "Please input the ID of the product you would like to buy"
		}
	]).then(function(answer) {

// Loop through the answer and check if it matches our available products
// If so, assign the product and its ID to a variable for later use
		for (var i = 0; i < res.length; i++) {
			if (res[i].id == answer.productId) {
				chosenItem = i;
				var product = answer.productId;

// Second prompt the user for quantity
				inquirer.prompt([
					{
						name: "productQuantity",
						type: "input",
						message: "Quantity?",
						validate: function(value) {
							if(isNaN(value) === false) {
								return true;
							}
							return false;
						}
					}
				]).then(function(answer) {

 
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request. 
					if ((res[chosenItem].quantity - answer.productQuantity)> 0) {

// This means updating the SQL database to reflect the remaining quantity.
						connection.query(
							'UPDATE products SET quantity="' + (res[chosenItem].quantity - answer.productQuantity) + '" WHERE id="' + product + '"', function(error, response) {
							if (error) throw error;
							
// Once the update goes through, show the customer the total cost of their purchase.
							console.log("------------------------------------------");
							console.log(answer.productQuantity + " " + res[chosenItem].product_name + "(s) has been successfully purchased!");
							console.log("The total cost of your purchase was: $" + (res[chosenItem].price * answer.productQuantity));
							console.log("------------------------------------------");
							console.log("Welcome to Bamazon!");
							queryProducts();
							}); // end of database update
					} // end of quantity check part 1 
					
// If not, inform the user and prevent the order from going through.
					else {
						console.log("Not enough in stock!");
						buy(res);
					} // end of quantity check part 2
				
				}) // end of second answer function 
			
			} // end of product ID check 
		
		} // end of product loop
	
	}); // end of first answer function

}  // end of buy function

// end of file 

var mysql = require('mysql');
var inquirer=require('inquirer');

var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,

 user: "root",

 password: "R0cketfuel!",
 database: "bamazon_db"
}); 
connection.connect(function(err) {
 if (err) {
   console.error("error connecting: " + err.stack);
 }
displayItems();
}); 
function displayItems(){
 connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  // Draw the table in the terminal using the response
  console.table(res);
  // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
  promptCustomerForItem(res);
});

}
function promptCustomerForItem(inventory) {
 // Prompts user for what they would like to purchase
 inquirer
   .prompt([
     {
       type: "input",
       name: "choice",
       message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
       validate: function(val) {
         return !isNaN(val) || val.toLowerCase() === "q";
       }
     }
   ])
   .then(function(val) {
     // Check if the user wants to quit the program
     checkIfShouldExit(val.choice);
     var choiceId = parseInt(val.choice);
     var product = checkInventory(choiceId, inventory);
    console.log(product)
     // If there is a product with the id the user chose, prompt the customer for a desired quantity
     if (product.id) {
       // Pass the chosen product to promptCustomerForQuantity
       promptCustomerForQuantity(product);
     }
     else {
       // Otherwise let them know the item is not in the inventory, re-run loadProducts
       console.log("\nThat item is not in the inventory.");
       displayItems();
     }
   });
}


function promptCustomerForQuantity(product) {
 inquirer
   .prompt([
     {
       type: "input",
       name: "quantity",
       message: "How many would you like? [Quit with Q]",
       validate: function(val) {
         return val > 0 || val.toLowerCase() === "q";
       }
     }
   ])
   .then(function(val) {
     // Check if the user wants to quit the program
     checkIfShouldExit(val.quantity);
     var quantity = parseInt(val.quantity);
     // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
     if (quantity > product.quantity) {
       console.log("\nInsufficient quantity!");
       displayItems();
     }
     else {
       // Otherwise run makePurchase, give it the product information and desired quantity to purchase
       makePurchase(product.id, quantity);
     }
   });
}

function checkIfShouldExit(choice) {
 if (choice.toLowerCase() === "q") {
   // Log a message and exit the current node process
   console.log("Goodbye!");
   process.exit(0);
 }
}

function checkInventory(choiceId, inventory) {
 // for (var i = 0; i < inventory.length; i++) {
 //   if (inventory[i].item_id === choiceId) {
 //     // If a matching product is found, return the product
 //     return inventory[i];
 //   }
 // }
 // // Otherwise return null
 // return null;
 connection.query("SELECT * FROM products where id=?",choiceId, function(err, res) {
  if (err) throw err;
if (res) {
 console.log("check product ID",res)
console.log(res[0].id,res[0].product_quantity)
let product={
 id:res[0].id,
 quantity:res[0].product_quantity

}
 return product
}
})
}
function makePurchase(product, quantity) {
 connection.query(
   "UPDATE products SET product_quantity = product_quantity - ? WHERE id = ?",
   [quantity, product],
   function(err, res) {
     // Let the user know the purchase was successful, re-run loadProducts
     console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
     loadProducts();
   }
 );
}






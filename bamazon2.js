//Dependencies
var mysql = require('mysql');
var inquirer=require('inquirer');
var table = require('cli-table');
//Establish server connection 
var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
  
   user: "root",
  
   password: "R0cketfuel!",
   database: "bamazon_db"
  }); 
  
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
 
});

//function for displaying items in inventory 
function displayItems(){
  connection.query('SELECT * FROM products', function(err,results){
    if (err) throw err;
  })
};

displayItems();


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

function displayItems(){
  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
    console.log(res);
    
    
  inquirer.prompt([{
       name: "productid",
       type: "input",
       message: "Enter product id.",
       validate: function(val) {
        return val > 0 || val.toLowerCase() === "q";
       ,{
         name:"quantity",
         type:"input",
         message:"enterquantity"
    }]) .then(function(getValue){
  // console.log(getValue.productid);
  // if (getValue.productid==="q"){
  //   connection.end();
  
  // }
  // else {
  //   //check array for quantity is ther for specifi id , if no do not place order 
  //   
  //   placeOrder(getValue.productid,getValue.quantity)
  //   })
  // })
  // }

  
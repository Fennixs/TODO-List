// get the client
const mysql = require("mysql");
require("dotenv").config();

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  database: "todoDb",
  password: process.env.DB_PASSWORD,
  port: 5945,
});

connection.connect();

connection.query("SELECT * FROM todolist", function (err, results, fields) {
  console.log(err);
  console.log("The solution is: ", results);
});

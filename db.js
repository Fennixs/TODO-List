// get the client
const {Client} = require('pg');
require("dotenv").config();
const client = new Client({
  host: "localhost",
  user: process.env.DB_USERNAME,
  database: "todoDb",
  password: process.env.DB_PASSWORD,
  port: 5945,
})

client.connect();

module.exports = client;


//client.query('SELECT * FROM todolist').then((res) => console.log(res.rows))







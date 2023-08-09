// get the client
const {Client} = require('pg');
require("dotenv").config();
const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

client.connect(); 

module.exports = client;


//client.query('SELECT * FROM todolist').then((res) => console.log(res.rows))


 




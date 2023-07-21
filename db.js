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


const run = async () => {
  await client.connect()

  const res = await client.query('SELECT * FROM todolist')
  console.log(res.rows)
  await client.end()

}

run();
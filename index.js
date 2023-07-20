const express = require("express");
const Datastore = require('nedb');
const app = express();
const port = 3000;



const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

const list = [];

app.post("/api/list", (req, res) => {
  console.log("I got a request!");
  const body = req.body;  
  const timestamp = Data.now();
  body.timestamp = timestamp;
  database.insert(body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

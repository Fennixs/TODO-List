const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

const list = [];

app.get("/api/list", (req, res) => {
  console.log("I got a request!");
  res.json([]);
});

app.post("/api/list", (req, res) => {
  const body = req.body;
  list.push(body);
  res.json(body);
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

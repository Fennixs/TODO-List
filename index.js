const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

app.get("/api/list", (req, res) => {
  console.log("I got a request!");
  res.json(tempDB);
});

app.post("/api/list", (req, res) => {
  const body = req.body;
  tempDB.push(body);
  res.json(body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

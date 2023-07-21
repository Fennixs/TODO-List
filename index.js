const express = require("express");
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static("public"));

const list = [];

// Route to fetch the list of items from the database and return them as JSON.
app.get("/api/list", (req, res) => {
  db.query('SELECT * FROM todolist')
  .then((dbRes) => {
    res.json(dbRes.rows);
  })
  .catch(console.error);
});

// Inserts item route
app.post("/api/list", async (req, res) => {
  const body = req.body;
  const sql = `INSERT INTO todolist (text)
  VALUES ($1) RETURNING *;`
  const dbRes = await db.query(sql, [body.text]);
  res.json(dbRes.rows);
});

// PUT route to update the completion status of a list item
app.put("/api/list", async (req, res) => { 
  const {completed, id} = req.body; 

  db.query('UPDATE todolist SET completed = $1 WHERE id = $2', [completed, id])
    .then((dbRes) => {
      console.log('Item successfully updated in the database.');
      res.status(200).json(dbRes.rows); 
    })
    .catch((err) => {
      console.error('Error updating item:', err);
      res.sendStatus(500);
    });
});

// Delete item route with "/:itemId" parameter
app.delete("/api/list", async (req, res) => {
  const {id} = req.body;

  db.query('DELETE FROM todolist WHERE id = $1', [id])
  .then((dbRes) =>{
    res.sendStatus(200);
  })
    .catch((err) => {
      console.error('Error deleting item:', err);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require("express");
const { v4 } = require('uuid');  // Import UUID library
const db = require("../db");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Example UUID-based path route
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

// Existing route to fetch the list of items from the database and return them as JSON.
app.get("/api/list", (req, res) => {
  db.query("SELECT * FROM todolist")
    .then((dbRes) => {
      res.json(dbRes.rows);
    })
    .catch(console.error);
});

// Existing inserts item route
app.post("/api/list", async (req, res) => {
  // ... your existing code for inserting items ...
});

// Existing PUT route to update the completion status of a list item
app.put("/api/list", async (req, res) => {
  // ... your existing code for updating items ...
});

// Existing delete item route with "/:itemId" parameter
app.delete("/api/list", async (req, res) => {
  // ... your existing code for deleting items ...
});

// Example route to handle UUID-based path
app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;

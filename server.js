/*jshint esversion: 6 */ 
// SQL 
const dbUtils = require("./database/connection.js");
const  dbConnection = dbUtils.createConnection();

// express
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



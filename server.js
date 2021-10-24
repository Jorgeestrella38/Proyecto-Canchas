//  Mongoose / SQL 
const database_connection = require("./database/connection.js");
pp = database_connection.getCredentials();
console.log(` ajaja ${pp}`)


// //  Express

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


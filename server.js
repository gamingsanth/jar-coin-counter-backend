const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const port = process.env.PORT || 3001;

app.use(cors());

app.get("/count",(req, res) => {
  connection.query("select count from counter", (err, result, fields) => {
    res.send({ count : result[0].count });
  })
});

app.put("/count", (req, res) => {
  connection.query("select count from counter", (err, result, fields) => {
    connection.query("update counter set count = ?", [result[0].count + 1], (err, result1, fields) => {
      res.send();
    })
  })
});

app.put("/decrease", (req, res) => {
  connection.query("select count from counter", (err, result, fields) => {
    if(result[0].count > 0) {
      connection.query("update counter set count = ?", [result[0].count - 1], (err, result1, fields) => {
        res.send();
      })
    } else {
      res.send();
    }
  })
});

app.put("/reset", async (req, res) => {
  connection.query("update counter set count = 0", (err, result, fields) => {
    res.send();
  })
});


app.listen(port, function() {
  console.log('Server running at :' + port + '/');
});

const { query } = require("express");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "C5hEy9wUU6b82Ky",
  database: "groupomania",
});

module.exports = db;

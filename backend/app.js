//const
const express = require("express");
const mysql = require("mysql2");
const db = require("./config_db");

const app = express();

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/users", userRoutes);

module.exports = app;

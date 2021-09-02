require("dotenv").config();
//const
const express = require("express");
const app = express();
const path = require("path");

//securité
const helmet = require("helmet");

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { appendFile } = require("fs");

//CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-type, Authorization"
  );
  next();
});

app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;

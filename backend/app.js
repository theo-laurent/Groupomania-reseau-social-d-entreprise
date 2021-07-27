//const
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//db
const sequelize = new Sequelize(
  "database_development_groupomania",
  "root",
  "C5hEy9wUU6b82Ky",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const testConnexionDb = function () {
  try {
    sequelize.authenticate();
    console.log("Connection réussie à la base de donnée.");
  } catch (error) {
    console.error("Echec de la connexion à la base de donnée.", error);
  }
};
testConnexionDb();

app.use("/api/users", userRoutes);

module.exports = app;

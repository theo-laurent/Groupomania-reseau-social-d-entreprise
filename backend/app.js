//const
const express = require("express");
const app = express();


//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//db

app.use("/api/users", userRoutes);

module.exports = app;

const { query } = require("express");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "C5hEy9wUU6b82Ky",
  database: "groupomania",
});

const groupomaniaDb = `CREATE DATABASE IF NOT EXISTS groupomania`;

const tableUser = `CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    bio TEXT,
    isAdmin TINYINT(1) NOT NULL DEFAULT 0
    ) ENGINE = InnoDB;`;

const tablePost = `CREATE TABLE IF NOT EXISTS post(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title TINYTEXT NOT NULL,
    content TEXT NOT NULL,
    attachment VARCHAR(255),
    createdAt DATETIME NOT NULL ,
    updatedAt DATETIME,
    FOREIGN KEY(userId) REFERENCES user(id)
    ) ENGINE =InnoDB;
    `;

const tableComment = `CREATE TABLE IF NOT EXISTS comment(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    FOREIGN KEY(userId) REFERENCES user(id),
    FOREIGN KEY(postId) REFERENCES post(id)
    ) ENGINE = InnoDB;
    `;

const tableLikes = `CREATE TABLE IF NOT EXISTS likes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (postId) REFERENCES post(id)
    ) ENGINE = InnoDB;`;

function generateDb() {
  db.connect(function (error) {
    if (error) throw error;
    else {
      console.log("Connexion au serveur MySQL...");
      db.query(groupomaniaDb);
      console.log("Base de données 'groupomania' créée");
      db.query(tableUser);
      console.log("La table 'user' est créée");
      db.query(tablePost);
      console.log("La table 'post' est créée");
      db.query(tableComment);
      console.log("La table 'comment' est créée");
      db.query(tableLikes);
      console.log("La table 'likes' est créée");
      console.log("Base de donnée bien configurée !");
    }
  });
}

generateDb();

module.exports = db;

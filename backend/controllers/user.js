const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config_db");

exports.signup = function (req, res, next) {
  bcrypt
    .hash(req.body.password, 15)
    .then(function (hash) {
      const user = {
        firstName: req.body.firstName.toUpperCase(),
        lastName: req.body.lastName.toUpperCase(),
        email: req.body.email,
        password: hash,
        bio: req.body.bio,
      };
      db.query(`INSERT INTO user(firstName, lastName, email, password, bio)
                VALUES("${user.firstName}","${user.lastName}","${user.email}","${user.password}","${user.bio}")`);
      res.status(201).json({ message: "Utilisateur créé" });
    })
    .catch(function (error) {
      res.status(500).json({ error });
    });
};

exports.login = function (req, res, next) {
  if (req.body.email != db.query(`SELECT email FROM user`)) {
    return res.status(401).json({ error: "Utilisateur non trouvé !" });
  } else {
    bcrypt
      .compare(
        req.body.password,
        db.query(`SELECT password FROM user WHERE email = "${req.body.email}"`)
      )
      .then(function (valid) {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        } else {
          res.status(200).json({
            userId: db.query(
              `SELECT id FROM user WHERE email = "${req.body.email}"`
            ),
            token: jwt.sign(
              {
                userId: db.query(
                  `SELECT id FROM user WHERE email = "${req.body.email}"`
                ),
              },
              "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr",
              {
                expiresIn: "24h",
              }
            ),
          });
        }
      });
  }
};
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
      db.query(`INSERT INTO user SET ?`, [user], function (error) {
        if (error) {
          res.status(400).json({ error });
        } else {
          res.status(201).json({ message: "Utilisateur créé." });
        }
      });
    })
    .catch(function (error) {
      res.status(500).json({ error });
    });
};

exports.login = function (req, res, next) {
  db.query(
    `SELECT id,password FROM user WHERE email = ?`,
    [req.body.email],
    function (error, results) {
      if (error) {
        throw error;
      } else {
        if (results.length === 0) {
          res.status(400).json({ message: "Utilisateur non trouvé." });
        } else {
          bcrypt
            .compare(req.body.password, results[0].password)
            .then(function (valid) {
              if (!valid) {
                return res
                  .status(401)
                  .json({ message: "Mot de passe incorrect" });
              } else {
                return res.status(200).json({
                  userId: results[0].id,
                  message: "Utilisateur connecté !",

                  token: jwt.sign(
                    {
                      userId: results[0].id,
                    },
                    "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr",
                    { expiresIn: "8h" }
                  ),
                });
              }
            });
        }
      }
    }
  );
};

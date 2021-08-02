const db = require("../config_db");
const jwt = require("jsonwebtoken");

exports.getAllPost = function (req, res, next) {
  db.promise()
    .query(
      `SELECT * FROM post JOIN user ON post.userId = user.id ORDER BY createdAt DESC`
    )
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      res.status(400).json({ error });
    });
};

exports.getOnePost = function (req, res, next) {
  let id = req.params.id;
  db.promise()
    .query(`SELECT * FROM post WHERE id = ${id}`)
    .then(function (data) {
      res.status(200).json({ data });
    })
    .catch(function (error) {
      res.status(400).json({ error });
    });
};

exports.createPost = function (req, res, next) {
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr");
  const userId = decodedToken.userId;
  db.promise().query(
    `INSERT INTO post(userId,title,content,attachment,createdAt)VALUES("${userId}","${req.body.title}","${req.body.content}","${req.body.attachment}","${dateTime}")`
  );
};

exports.deletePost = function (req, res, next) {
  let id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr");
  const userId = decodedToken.userId;
  const sqlId = db.query(`SELECT userId FROM post WHERE id = ${id}`);
  db.promise()
    .query(`SELECT * FROM post WHERE id = ${id}`)
    .then(function () {
      if (userId == sqlId) {
        db.promise().query(`DELETE from post WHERE id = ${id}`)
        .then(function (){
          res.status(200).json({message : "Post supprimé !"})
        })
        .catch(function(error){
          res.status(404).json({error})
        })
      } else {
        res
          .status(401)
          .json({
            message:
              "Vous ne pouvez pas supprimer les posts des autres utilisateurs !",
          });
      }
    })
    .catch(function (error) {
      res.status(500).json({ error });
    });
};

exports.updatePost;

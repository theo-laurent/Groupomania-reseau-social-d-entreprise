const db = require("../config_db");
const jwt = require("jsonwebtoken");

exports.getAllPost = function (req, res, next) {
  db.promise()
    .query(
      `SELECT user.firstName, user.lastName, post.id, post.userId, 
        post.title, post.content, post.attachment, post.createdAt 
      FROM user 
      JOIN post on user.id = post.userId 
      ORDER BY post.createdAt DESC`
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
  db.query(
    `SELECT post.id AS postId, post.title, post.content, post.attachment, 
            post.createdAt, post.updatedAt, 
            user.firstName, user.lastName, user.id AS userId
      FROM post
      JOIN user
      ON post.userId = user.ids
      WHERE post.id = ?;`,
    [id],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.createPost = function (req, res, next) {
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "6b9adNtSEFFY5ZID6rRFHZ4FWnOMVr");
  const userId = decodedToken.userId;

  const article = {
    userId: userId,
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    createdAt: dateTime,
  };
  db.query(`INSERT INTO post SET ?`, [article], function (error) {
    if (error) {
      throw error;
    } else {
      res.status(201).json({ message: "Article bien ajouté !" });
    }
  });
};

exports.deletePost = function (req, res, next) {
  let id = req.params.id;

  db.query("DELETE FROM post WHERE id = ?", [id], function (error, result) {
    if (error) {
      throw error;
    } else {
      res.status(201).json({ message: "Publication bien supprimé !" });
    }
  });
};

exports.updatePost;

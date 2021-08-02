const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/", postController.getAllPost);
router.get("/:id",postController.getOnePost);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);

module.exports = router;

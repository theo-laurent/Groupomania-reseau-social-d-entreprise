const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const postController = require("../controllers/post");

router.get("/", auth, postController.getAllPost);
router.get("/:id", auth, postController.getOnePost);
router.post("/article", auth, postController.createPost);
router.delete("/:id", auth, postController.deletePost);
router.post("/postComment", auth, postController.commentPost);
router.get("/getComment/:id", auth, postController.getComment);

module.exports = router;

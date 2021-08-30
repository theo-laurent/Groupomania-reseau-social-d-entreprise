const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", auth, postController.getAllPost);
router.get("/:id", auth, postController.getOnePost);
router.post("/article", auth,multer, postController.createPost);
router.delete("/:id", auth, postController.deletePost);
router.post("/postComment", auth, postController.commentPost);
router.get("/getComment/:id", auth, postController.getComment);

module.exports = router;

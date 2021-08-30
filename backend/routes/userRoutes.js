const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

//rajouter auth
router.get("/getUser", auth, userController.getUser);
router.get("/userArticles", auth, userController.userArticles);
router.post("/userUpdate", auth, multer, userController.userUpdate);
router.delete("/userDelete", auth, userController.userDelete);

module.exports = router;

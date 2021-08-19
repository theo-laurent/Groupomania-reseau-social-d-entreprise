const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const multer = require("../middleware/multer");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/getUser", userController.getUser);
router.get("/userArticles", userController.userArticles);
router.put("/userUpdate", multer, userController.userUpdate);
router.delete("/userDelete", userController.userDelete);

module.exports = router;

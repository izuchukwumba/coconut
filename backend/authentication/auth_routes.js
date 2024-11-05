const express = require("express");
const router = express.Router();
const authController = require("./auth_controller");

router.post("/signup", authController.InitialSignUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;

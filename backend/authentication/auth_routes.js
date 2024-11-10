const express = require("express");
const router = express.Router();
const authController = require("./auth_controller");

router.post("/signup", authController.initialSignup);
router.post("/final_signup", authController.finalSignup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;

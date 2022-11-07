var express = require("express");
var router = express.Router();
const passport = require("../../auth/index");
const authController = require("./authController");
router.post("/register", authController.register);
router.post("/login", passport.authenticate("local", { session: false }), authController.loginSuccess);
module.exports = router;

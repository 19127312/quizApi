var express = require("express");
var router = express.Router();
const passport = require("../../passport/index");
const userController = require("./userController");
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.getProfile);
module.exports = router;
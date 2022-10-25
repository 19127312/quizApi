const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: String,
    password: String,
    emailAddress: String,
});
module.exports = mongoose.model("User", userSchema);

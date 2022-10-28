const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: String,
    password: String,
    email: String,
    type: String,
});
module.exports = mongoose.model("User", userSchema);

const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const jwt = require("jsonwebtoken");

exports.register = async (fullName, email, password, type) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return await userModel.create({
        fullName,
        email,
        password: passwordHash,
        type
    });
};
exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
};

exports.findByUsername = (fullName) => {
    return userModel
        .findOne({
            fullName,
        })
        .lean();
};

exports.findByEmail = (email) => {
    return userModel.findOne({ email }).lean();

};

exports.generateAccessToken = ({ email, _id, fullName, type }) => {
    return jwt.sign({ email, _id, fullName, type }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}
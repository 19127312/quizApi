const bcrypt = require("bcrypt");
const userModel = require("./userModel");

exports.register = async (username, email, password) => {
    console.log(username, email, password);
    const passwordHash = await bcrypt.hash(password, 10);
    return await userModel.create({
        fullName: username,
        email: email,
        password: passwordHash,
    });
};

exports.findByUsername = (username) => {
    return userModel
        .findOne({
            fullName: username,
        })
        .lean();
};

exports.findByEmail = (email) => {
    return userModel.findOne({ email: email, }).lean();
};

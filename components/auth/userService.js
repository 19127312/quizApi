const bcrypt = require("bcrypt");
const userModel = require("./userModel");

exports.register = async (fullName, email, password, type) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return await userModel.create({
        fullName,
        email,
        password: passwordHash,
        type
    });
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

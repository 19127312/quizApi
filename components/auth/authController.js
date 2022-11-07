const userService = require("./userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {

    const { fullName, email, password, type } = req.body;

    const checkingUserEmail = await userService.findByEmail(email);
    try {
        if (!checkingUserEmail) {


            const user = await userService.register(fullName, email, password, type);
            delete user.password;

            res.json({
                user,
                message: "User created successfully!"
            });
        }
        else {
            res.status(400).json({ error: "This email address is already used" });
        }
    } catch (error) {

        res.status(400).json({ error: error.message ?? "Unknow Error" });
    }

};

exports.loginSuccess = async (req, res) => {
    const { email, _id, fullName, type } = req.user;
    const accessToken = userService.generateAccessToken({ email, _id, fullName, type });
    res.json({
        user: {
            email,
            _id,
            fullName,
            type,

        },
        accessToken
        , message: "User logged in successfully!"
    });
    //Axios interceptors frontend, add token to header, then send request to backend with token use with passport-jwt

    // const user = await userService.findByEmail(email);
    // try {
    //     if (user) {
    //         const isMatch = await bcrypt.compare(password, user.password);
    //         if (isMatch) {
    //             delete user.password;
    //             res.json({
    //                 user,
    //                 message: "Login successfully!",
    //             });
    //         } else {
    //             res.status(400).json({ error: "The password you entered is incorrect" });
    //         }
    //     } else {
    //         res.status(400).json({ error: "User not found" });
    //     }
    // } catch (error) {
    //     res.status(400).json({ error: error.message ?? "Unknow Error" });
    // }

}


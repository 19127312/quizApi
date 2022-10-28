const userService = require("./userService");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

    const { fullName, email, password, type } = req.body;

    const checkingUserEmail = await userService.findByEmail(email);
    try {
        if (!checkingUserEmail) {


            const user = await userService.register(fullName, email, password, type);
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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    try {
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {

                res.json({
                    user,
                    message: "Login successfully!",
                });
            } else {
                res.status(400).json({ error: "The password you entered is incorrect" });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message ?? "Unknow Error" });
    }

}


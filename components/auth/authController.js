const userService = require("./userService");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    const checkingUsername = await userService.findByUsername(fullName);
    const checkingUserEmail = await userService.findByEmail(email);
    try {
        if (!checkingUserEmail && !checkingUsername) {
            if (password === confirmPassword) {

                const user = await userService.register(fullName, email, password);
                res.json({
                    user,
                    message: "User created successfully!"
                });
            }
            else {
                res.status(400).json({ error: "Password and confirm password are not the same" });
            }
        }
        else {
            res.status(400).json({ error: "Duplicated User" });

        }
    } catch (error) {

        res.status(400).json({ error: error.message ?? "Unknow Error" });
    }

};

exports.login = async (req, res) => {
    const { fullName, password } = req.body;
    console.log(fullName, password);
    const user = await userService.findByUsername(fullName);
    try {
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {

                res.json({
                    user,
                    message: "Login successfully!",
                });
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message ?? "Unknow Error" });
    }

}


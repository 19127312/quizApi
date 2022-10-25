const userService = require("./userService");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const { fullName, emailAddress, password, confirmPassword } = req.body;
    console.log(fullName, emailAddress, password);

    const checkingUsername = await userService.findByUsername(fullName);
    const checkingUserEmail = await userService.findByEmail(emailAddress);
    try {
        if (!checkingUserEmail && !checkingUsername) {
            if (password === confirmPassword) {

                const user = await userService.register(fullName, emailAddress, password);
                res.json({
                    user,
                    message: "User created successfully!"
                });
            }
            else {
                console.log("2");

                res.status(400).json({ error: "Wrong confirm" });

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
}
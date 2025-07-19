const { login } = require("../services/auth.service");

async function loginController(req, res) {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.status(200).json({
            message: "Login successful",
            status: 200,
            token: token,
        });
    } catch (err) {
        res.status(401).json({
            message: err.message,
            status: 401
        });
    }
}

module.exports = { loginController };

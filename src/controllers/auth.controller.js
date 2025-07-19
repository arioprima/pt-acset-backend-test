const { login, logout } = require("../services/auth.service");

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

async function logoutController(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await logout(token);

        res.status(200).json({
            message: "Logout successful",
            status: 200
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: 500
        });
    }
}


module.exports = { loginController, logoutController };

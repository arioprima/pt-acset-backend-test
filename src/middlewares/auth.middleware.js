const jwt = require("jsonwebtoken");
const Session = require("../models/session.model");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header missing or invalid",
            status: 401
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const session = await Session.findOne({
            token: token,
            expires_at: { $gte: new Date() }
        });

        if (!session) {
            return res.status(401).json({
                message: "Token is invalid, revoked, or expired",
                status: 401
            });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                status: 401
            });
        }
        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired",
                status: 401
            });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token",
                status: 401
            });
        } else {
            console.error("Authentication error:", err);
            return res.status(401).json({
                message: "Not authorized to access this resource",
                status: 401
            });
        }
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to access this resource",
                status: 403
            });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
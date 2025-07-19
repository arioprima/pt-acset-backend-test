const { findByUsername } = require("../repositories/user.repository");
const comparePassword = require("../helpers/comparePassword");
const generateJWT = require("../helpers/generateJWT");
const jwt = require("jsonwebtoken");
const Session = require("../models/session.model");

const login = async (username, password) => {
    const user = await findByUsername(username);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    await Session.deleteMany({
        user_id: user._id,
        expires_at: { $gt: new Date() }
    });

    const token = generateJWT(user);
    const decoded = jwt.decode(token);

    await Session.create({
        user_id: user._id,
        token,
        expires_at: new Date(decoded.exp * 1000),
    });

    return token;
}

const logout = async (token) => {
    await Session.deleteOne({ token });
}


module.exports = { login, logout };
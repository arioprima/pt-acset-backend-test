const { findByUsername } = require("../repositories/user.repository");
const comparePassword = require("../helpers/comparePassword");
const generateJWT = require("../helpers/generateJWT");

async function login(username, password) {
    const user = await findByUsername(username);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return generateJWT(user);
}

module.exports = { login };

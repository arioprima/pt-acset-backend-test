const User = require("../models/user.model");

async function findByUsername(username) {
    return User.findOne({ username });
}

module.exports = { findByUsername };

const User = require("../models/user.model");

const findByUsername = (username) => {
    return User.findOne({ username });
}

module.exports = { findByUsername };

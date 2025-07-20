const Branch = require("../models/branch.model");

const findAllBranches = () => {
    return Branch.find();
};

module.exports = { findAllBranches };

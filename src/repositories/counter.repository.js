const Counter = require("../models/counter.model");

const findCountersByBranch = (branch_id) => {
    return Counter.find({ branch_id });
};

module.exports = { findCountersByBranch };

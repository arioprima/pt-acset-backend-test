const CounterRepo = require("../repositories/counter.repository");

const getCountersByBranch = async (branch_id) => {
    return await CounterRepo.findCountersByBranch(branch_id);
};

module.exports = { getCountersByBranch };

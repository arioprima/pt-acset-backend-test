const BranchRepo = require("../repositories/branch.repository");

const getBranches = async () => {
    return await BranchRepo.findAllBranches();
};

module.exports = { getBranches };

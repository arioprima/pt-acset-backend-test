const BranchService = require("../services/branch.service");

exports.getAllBranches = async (req, res) => {
    try {
        const branches = await BranchService.getBranches();
        res.json({ message: "Branches retrieved successfully", status: 200, data: branches });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch branches", status: 500 });
    }
};

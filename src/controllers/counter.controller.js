const CounterService = require("../services/counter.service");

exports.getCountersByBranch = async (req, res) => {
    const { branch_id } = req.query;

    if (!branch_id) {
        return res.status(400).json({ message: "branch_id is required", status: 400 });
    }

    try {
        const counters = await CounterService.getCountersByBranch(branch_id);
        res.json({ message: "Counters retrieved successfully", status: 200, data: counters });
    } catch (err) {
        console.error("Error fetching counters:", err);
        res.status(500).json({ message: "Failed to fetch counters", status: 500 });
    }
};

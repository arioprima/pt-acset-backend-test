const queueService = require('../services/queue.service');

const getAllQueues = async (req, res) => {
    const queues = await queueService.getAllQueues();
    res.json({ message: "Queues retrieved successfully", status: 200, data: queues });
};

const markQueueAsDone = async (req, res) => {
    const { id } = req.params;
    const updated = await queueService.markAsDone(id);
    if (!updated) return res.status(404).json({ message: "Queue not found", status: 404 });
    res.json({ message: "Queue marked as done", status: 200 });
};

const takeQueue = async (req, res) => {
    try {
        const { branch_id, counter_id } = req.body;

        if (!branch_id || !counter_id) {
            return res.status(400).json({ message: "branch_id and counter_id are required", status: 400 });
        }

        const queue = await queueService.takeQueue(branch_id, counter_id);
        res.json({ message: "Queue taken successfully", status: 200, data: queue });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};


module.exports = { getAllQueues, markQueueAsDone, takeQueue };

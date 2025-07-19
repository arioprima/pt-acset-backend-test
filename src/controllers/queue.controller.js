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
        const queue = await queueService.takeQueue();
        res.json({ message: "Queue taken successfully", status: 200, data: queue });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAllQueues, markQueueAsDone, takeQueue };

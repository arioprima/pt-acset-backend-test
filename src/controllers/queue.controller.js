const queueService = require('../services/queue.service');
const { getIO } = require('../socket');

const getAllQueues = async (req, res) => {
    const { branch_id, counter_id, status = 'all', page = 1, limit = 10 } = req.query;

    if (!branch_id) {
        return res.status(400).json({ message: "branch_id is required", status: 400 });
    }

    try {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const allowedStatuses = ['waiting', 'done', 'all'];
        const safeStatus = allowedStatuses.includes(status) ? status : 'all';

        const result = await queueService.getAllQueues({
            branch_id,
            counter_id,
            status: safeStatus,
            page: pageNum,
            limit: limitNum,
        });

        res.json({
            message: "Queues retrieved successfully",
            status: 200,
            data: result.data,
            pagination: result.pagination,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
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

        const io = getIO();
        io.to(`branch_${branch_id}`).emit("new_queue_taken", queue);
        io.to(`counter_${counter_id}`).emit("new_queue_taken", queue);

        res.json({ message: "Queue taken successfully", status: 200, data: queue });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

const getLastQueueNumberToday = async (req, res) => {
    const { branch_id, counter_id } = req.query;

    if (!branch_id || !counter_id) {
        return res.status(400).json({
            message: "branch_id and counter_id are required",
            status: 400
        });
    }

    try {
        const lastNumber = await queueService.getLastQueueNumberToday(branch_id, counter_id);
        res.json({
            message: "Last queue number retrieved successfully",
            status: 200,
            number: lastNumber
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};


module.exports = { getAllQueues, markQueueAsDone, takeQueue, getLastQueueNumberToday };

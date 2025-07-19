const Queue = require('../models/queue.model');

const getAll = () => {
    return Queue.find().populate('counter_id');
};

const updateStatus = (id, status) => {
    return Queue.findByIdAndUpdate(id, { status }, { new: true });
};

const createQueue = async ({ counter_id, branch_id, number }) => {
    return await Queue.create({
        counter_id,
        branch_id,
        number,
    });
};

const getLastQueueNumberToday = async (counter_id) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const latest = await Queue.findOne({
        counter_id,
        timestamp: { $gte: startOfDay }
    }).sort({ number: -1 });

    return latest ? latest.number : 0;
};

module.exports = { getAll, updateStatus, createQueue, getLastQueueNumberToday };

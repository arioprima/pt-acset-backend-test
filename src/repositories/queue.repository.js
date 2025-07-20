const Queue = require('../models/queue.model');
const paginate = require('../utils/paginate');

const getAll = ({ branch_id, counter_id, status, page = 1, limit = 10 }) => {
    const query = { branch_id };

    if (counter_id) query.counter_id = counter_id;

    if (status && status !== 'all') {
        query.status = status;
    }

    return paginate(Queue, query, 'counter_id', { timestamp: 1 }, page, limit);
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

const getLastQueueNumberToday = async (branch_id, counter_id) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const latest = await Queue.findOne({
        branch_id,
        counter_id,
        timestamp: { $gte: startOfDay }
    }).sort({ number: -1 });

    return latest ? latest.number : 0;
};


module.exports = { getAll, updateStatus, createQueue, getLastQueueNumberToday };

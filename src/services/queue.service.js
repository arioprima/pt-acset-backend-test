const queueRepository = require('../repositories/queue.repository');
const Counter = require('../models/counter.model');



const getAllQueues = () => {
    return queueRepository.getAll();
};

const markAsDone = (id) => {
    return queueRepository.updateStatus(id, 'done');
};

const takeQueue = async () => {
    const counter = await Counter.findOne().populate('branch_id');
    if (!counter) throw new Error("No counter found");

    const lastNumber = await queueRepository.getLastQueueNumberToday(counter._id);
    const newNumber = lastNumber + 1;

    const queue = await queueRepository.createQueue({
        counter_id: counter._id,
        branch_id: counter.branch_id,
        number: newNumber,
    });

    return queue;
};
module.exports = { getAllQueues, markAsDone, takeQueue };

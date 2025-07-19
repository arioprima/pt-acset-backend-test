const queueRepository = require('../repositories/queue.repository');
const Counter = require('../models/counter.model');
const Queue = require('../models/queue.model');

const getAllQueues = () => {
    return queueRepository.getAll();
};

const markAsDone = (id) => {
    return queueRepository.updateStatus(id, 'done');
};

const takeQueue = async (branch_id, counter_id) => {
    const counter = await Counter.findOneAndUpdate(
        { _id: counter_id, branch_id },
        { $inc: { last_number: 1 } },
        { new: true }
    );

    if (!counter) throw new Error("Counter not found");

    const newQueue = await Queue.create({
        branch_id,
        counter_id,
        number: counter.last_number,
        status: "waiting",
        timestamp: new Date(),
    });

    return newQueue.populate("branch_id");
}

const getLastQueueNumberToday = async (counter_id) => {
    return queueRepository.getLastQueueNumberToday(counter_id);
};

module.exports = { getAllQueues, markAsDone, takeQueue, getLastQueueNumberToday };

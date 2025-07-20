const queueRepository = require('../repositories/queue.repository');
const Counter = require('../models/counter.model');
const Queue = require('../models/queue.model');
const Branch = require('../models/branch.model');

const getAllQueues = (filters) => {
    return queueRepository.getAll(filters);
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

    const branch = await Branch.findById(branch_id);
    if (!branch || !branch.branch_code) {
        throw new Error("Branch not found or branch code missing");
    }
    const formattedNumber = `${branch.branch_code}-${counter.last_number.toString().padStart(3, '0')}`;


    const newQueue = await Queue.create({
        branch_id,
        counter_id,
        number: counter.last_number,
        number_formatted: formattedNumber,
        status: "waiting",
        timestamp: new Date(),
    });

    return newQueue.populate("branch_id");
}

const getLastQueueNumberToday = async (branch_id, counter_id) => {
    return queueRepository.getLastQueueNumberToday(branch_id, counter_id);
};

module.exports = { getAllQueues, markAsDone, takeQueue, getLastQueueNumberToday };

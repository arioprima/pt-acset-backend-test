const queueRepository = require('../repositories/queue.repository');

const getAllQueues = () => {
    return queueRepository.getAll();
};

const markAsDone = (id) => {
    return queueRepository.updateStatus(id, 'done');
};

module.exports = { getAllQueues, markAsDone };

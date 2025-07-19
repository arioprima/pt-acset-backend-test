const Queue = require('../models/queue.model');

const getAll = () => {
    return Queue.find().populate('counter_id');
};

const updateStatus = (id, status) => {
    return Queue.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = { getAll, updateStatus };

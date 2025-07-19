const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
    counter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Counter", required: true },
    number: { type: Number, required: true },
    status: { type: String, enum: ["waiting", "called", "done"], default: "waiting" },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Queue", queueSchema);

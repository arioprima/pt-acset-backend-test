const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    counter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Counter", required: true },
    machine_id: { type: mongoose.Schema.Types.ObjectId, ref: "Machine" },
    number: { type: Number, required: true },
    status: { type: String, enum: ["waiting", "called", "done"], default: "waiting" },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Queue", queueSchema);

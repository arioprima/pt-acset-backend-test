const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Counter", counterSchema);

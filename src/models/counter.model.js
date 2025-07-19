const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_number: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Counter", counterSchema);

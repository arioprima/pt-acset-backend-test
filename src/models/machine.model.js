const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    uuid: { type: String, required: true },
    type: { type: String, enum: ["antrian", "display"], required: true },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Machine", machineSchema);

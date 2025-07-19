const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branch_code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Branch", branchSchema);

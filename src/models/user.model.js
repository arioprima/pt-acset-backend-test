const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "admin" },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("User", userSchema);

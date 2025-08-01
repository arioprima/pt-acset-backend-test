const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Session", sessionSchema);

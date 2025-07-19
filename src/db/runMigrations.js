require("dotenv").config();

const mongoose = require("mongoose");
const initMigration = require("./migrations/initMigration");
const connectDB = require("../config/database");

async function run() {
    try {
        await connectDB();
        await initMigration();
        console.log("migration success");
    } catch (error) {
        console.error("migration error", error);
    } finally {
        mongoose.disconnect();
    }
}

run();

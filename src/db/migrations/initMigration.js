const hashPassword = require("../../helpers/hashPassword");
const Branch = require("../../models/branch.model");
const User = require("../../models/user.model");
const Counter = require("../../models/counter.model");
const Machine = require("../../models/machine.model");
const Queue = require("../../models/queue.model");

async function initMigration() {
    const count = await Branch.countDocuments();
    if (count > 0) {
        console.log("Migration skipped: Data already exists.");
        return;
    }

    const branch = await Branch.create({
        branch_code: "BR001",
        name: "Cabang Utama",
        location: "Jakarta",
        created_at: new Date(),
    });

    await User.create({
        username: "admin",
        password: await hashPassword("admin123"),
        role: "admin",
        branch_id: branch._id,
        created_at: new Date(),
    });

    await Counter.create({
        branch_id: branch._id,
        name: "Counter 1",
        created_at: new Date(),
    });

    await Machine.create({
        branch_id: branch._id,
        uuid: "machine-001",
        type: "antrian",
        created_at: new Date(),
    });

    await Machine.create({
        branch_id: branch._id,
        uuid: "machine-002",
        type: "display",
        created_at: new Date(),
    });

    await Queue.collection.createIndex(
        { branch_id: 1, number: 1 },
        { unique: true }
    );
}

module.exports = initMigration;

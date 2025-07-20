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

    const branchesData = [
        {
            branch_code: "BR001",
            name: "Cabang Jakarta Pusat",
            location: "Jakarta",
        },
        {
            branch_code: "BR002",
            name: "Cabang Bandung Timur",
            location: "Bandung",
        },
        {
            branch_code: "BR003",
            name: "Cabang Tangerang Selatan",
            location: "Tangerang",
        },
        {
            branch_code: "BR004",
            name: "Cabang Surabaya Barat",
            location: "Surabaya",
        },
        {
            branch_code: "BR005",
            name: "Cabang Yogyakarta Utara",
            location: "Yogyakarta",
        },
    ];



    for (const branchData of branchesData) {
        const branch = await Branch.create({
            ...branchData,
            created_at: new Date(),
        });

        await User.create({
            username: `admin`,
            password: await hashPassword("admin123"),
            role: "admin",
            branch_id: branch._id,
            created_at: new Date(),
        });

        await Counter.insertMany([
            {
                branch_id: branch._id,
                name: "Layanan A",
                created_at: new Date(),
            },
            {
                branch_id: branch._id,
                name: "Layanan B",
                created_at: new Date(),
            },
        ]);

        await Machine.insertMany([
            {
                branch_id: branch._id,
                uuid: `antrian-${branch.branch_code.toLowerCase()}`,
                type: "antrian",
                created_at: new Date(),
            },
            {
                branch_id: branch._id,
                uuid: `display-${branch.branch_code.toLowerCase()}`,
                type: "display",
                created_at: new Date(),
            },
        ]);
    }

    await Queue.collection.createIndex(
        { branch_id: 1, number: 1 },
        { unique: true }
    );

    await Queue.collection.createIndex(
        { branch_id: 1, counter_id: 1, created_at: -1 }
    );

    console.log("✅ Migration completed with sample data for branches, users, counters, and machines.");
}

module.exports = initMigration;

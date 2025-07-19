const hashPassword = require("../../helpers/hashPassword");
const Branch = require("../../models/branch.model");
const User = require("../../models/user.model");

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
}

module.exports = initMigration;

const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const queueRoutes = require("./queue.routes");

router.use("/auth", authRoutes);
router.use("/queues", queueRoutes);

module.exports = router;

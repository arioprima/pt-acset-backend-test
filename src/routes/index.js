const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const queueRoutes = require("./queue.routes");

router.use("/auth", authRoutes);
router.use("/queue", queueRoutes);
router.use("/branches", require("./branch.routes"));
router.use("/counters", require("./counter.routes"));

module.exports = router;

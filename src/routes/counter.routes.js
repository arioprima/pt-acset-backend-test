const express = require("express");
const router = express.Router();
const CounterController = require("../controllers/counter.controller");

router.get("/", CounterController.getCountersByBranch);

module.exports = router;

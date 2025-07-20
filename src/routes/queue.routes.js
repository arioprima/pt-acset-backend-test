const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queue.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

router.get("/", authenticate, authorize("admin"), queueController.getAllQueues);

router.put("/:id/done", authenticate, authorize("admin"), queueController.markQueueAsDone);

router.post("/take", queueController.takeQueue);

router.get("/latest", queueController.getLastQueueNumberToday);



module.exports = router;

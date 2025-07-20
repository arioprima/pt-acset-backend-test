const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/branch.controller");

router.get("/", BranchController.getAllBranches);

module.exports = router;

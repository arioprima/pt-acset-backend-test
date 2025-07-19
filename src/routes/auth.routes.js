const express = require("express");
const { loginController, logoutController } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);

module.exports = router;

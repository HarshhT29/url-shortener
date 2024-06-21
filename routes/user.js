const express = require("express");

const { createNewUser, loginUser } = require("../controllers/userHandlers");

const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);

module.exports = router;
const express = require("express");
const { renderIndexHtml } = require("../controllers/urlHandlers");

const router = express.Router();

router.get("/", renderIndexHtml);

module.exports = router;
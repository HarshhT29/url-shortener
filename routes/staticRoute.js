const express = require("express");
const { renderIndexHtml } = require("../controllers/urlHandlers");
const { renderSignUp, renderLogin } = require("../controllers/userHandlers");

const router = express.Router();

router.get("/", renderIndexHtml);
router.get("/signup", renderSignUp);
router.get("/login", renderLogin);


module.exports = router;
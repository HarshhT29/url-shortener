const express = require("express");
const { generateNewShortURL, getURLByShortId, getAnalytics } = require("../controllers/urlHandlers");
const shortid = require("shortid");

const router = express.Router();

router.post('/', generateNewShortURL);
router.get('/:shortId', getURLByShortId);
router.get('/analytics/:shortId',getAnalytics);

module.exports = router;
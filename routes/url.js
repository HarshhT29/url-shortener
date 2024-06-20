const express = require("express");
const { generateNewShortURL,getURLByShortId } = require("../controllers/urlHandlers")

const router = express.Router();

router.post('/', generateNewShortURL);
router.get('/:shortId', getURLByShortId);

module.exports = router;
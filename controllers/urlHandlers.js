const shortid = require("shortid");
const URL = require("../models/url");

const generateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url)
        return res.status(400).json({ error: "url not found" });
    const shortID = shortid();
    await URL.create({
        short_id: shortID,
        redirect_url: body.url,
        visit_history: [],
    });
    return res.json({ id: shortID });
};

const getURLByShortId = async (req, res) => {
    const shortId = req.params.shortId;
    const entryUrl = await URL.findOneAndUpdate({short_id:shortId},{
        $push: {
            visit_history: {
                timestamp: Date.now(),
            },
        },
    });
    res.redirect(entryUrl.redirect_url);
}

module.exports = {
    generateNewShortURL, getURLByShortId,
};
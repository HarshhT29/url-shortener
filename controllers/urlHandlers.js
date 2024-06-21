const shortid = require("shortid");
const URL = require("../models/url");

const renderIndexHtml = async (req,res) => {
    const allUrls = await URL.find({});
    return res.render("index", {
        urls: allUrls,
    });
};

const generateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url)
        return res.status(400).json({ error: "url not found" });
    const shortID = shortid();
    await URL.create({
        short_id: shortID,
        redirect_url: body.url,
        visit_history: [],
        createdBy: req.user._id,
    });
    return res.render("index",{
        id: shortID,
    });
};

const getURLByShortId = async (req, res) => {
    const shortId = req.params.shortId;
    const entryUrl = await URL.findOneAndUpdate({ short_id: shortId }, {
        $push: {
            visit_history: {
                timestamp: Date.now(),
            },
        },
    });
    res.redirect(entryUrl.redirect_url);
};

const getAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ short_id: shortId });

    return res.json({
        TotalClicks: result.visit_history.length,
        ClickAnalytics: result.visit_history,
    });
};

module.exports = {
    generateNewShortURL, getURLByShortId, getAnalytics, renderIndexHtml,
};
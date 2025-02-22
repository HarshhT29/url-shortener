const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    short_id: {
        type: String,
        required: true,
        unique: true,
    },
    redirect_url: {
        type: String,
        required: true,
        unique: true,
    },
    visit_history: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.ObjectId,        // isska mtlb hai ki mai createdBy mei ek id hai
        ref: 'Users',                          // jo user ko reference kar raha hai
    },
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
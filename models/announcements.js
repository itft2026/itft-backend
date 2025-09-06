const mongoose = require("mongoose");

const announcements = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Announcements = mongoose.model("Announcements", announcements)
module.exports = Announcements
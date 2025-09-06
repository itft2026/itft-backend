const mongoose = require("mongoose");

const Events = mongoose.Schema({
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
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    poster: {
        type: String
    },
    registrationLink: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: "Upcoming",
        enum: ["Upcoming", "Completed", "Cancelled", "Postponed"],
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    }
})

const Event = mongoose.model("Event", Events);
module.exports = Event
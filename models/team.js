const mongoose = require("mongoose");

const team = mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    gitHub: {
        type: String,
        required: true
    },
    portfolio: {
        type: String
    }
})

const Team = mongoose.model("Team", team)
module.exports = Team
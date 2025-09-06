const mongoose = require("mongoose")

const results = mongoose.Schema({
    eventID: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    winner: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    }],
    runnerUp: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    }],
    
    eventsImages: [{
        type: String,
        required: true
    }],
    resultSheet: {
        type:String
    },
    date: {
        type: Date,
        required: true
    },
    noOfParticipants: {
        type: Number,
        required: true
    },
    video: {
        type: String
    },
    venue: {
        type: String
    }
})

const Result = mongoose.model("Result", results)

module.exports = Result
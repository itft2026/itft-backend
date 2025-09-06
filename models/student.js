const mongoose = require("mongoose")

const subscribtion = mongoose.Schema({
    regno: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true,
        enum : ["A", "B", "C", "D", "E", "F", "G", "H"]
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    personalEmail: {
        type: String,
        required: true
    },
    portfolio: {
        type: String
    }
})

const Students = mongoose.model("Students", subscribtion)
module.exports = Students
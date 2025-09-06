const mongoose = require("mongoose");

const faculty = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    googleScholar: {
        type: String
    },
    message: {
        type: String
    }
})

const Professor = mongoose.model("Professor", faculty)
module.exports = Professor
const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("------------------CONNECTED WITH MONGODB DATABASE------------------");
    } catch (error) {
        console.error("------------------UNABLE TO CONNECT WITH MONGODB DATABASE------------------", error);
    }
}

module.exports = connectDB;
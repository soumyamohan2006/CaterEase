const mongoose = require("mongoose");

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

module.exports = connectDB;
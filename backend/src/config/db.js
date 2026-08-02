const mongoose = require("mongoose");

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODBURL);
    console.log("MongoDB connected successfully");
};

module.exports = connectDB;
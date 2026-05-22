const mongoose = require("mongoose")

async function connectDB() {
    console.log('connectdb called')
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    } catch (err) {
        console.log("error detected:", err)
    } 
}

module.exports = { connectDB }
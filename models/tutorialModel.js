const mongoose = require("mongoose");


const tutorialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    tutor: { type: String, required: true },
    course: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    host: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: String, required: true },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial; 
const mongoose = require("mongoose");


const tutorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: Number, required: true },
    department: { type: String, required: true },
    bio: { type: String, required: true },
    courses: [String],
    rating: { type: Number, default: 0 },
    profilePicture: { type: String }
}, { timestamps: true })

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor 
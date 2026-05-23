const Tutor = require("../models/tutorModel")

async function getTutor(req, res) {
    try {
        const tutors = await Tutor.find();
        res.json(tutors)
    } catch (err) {
       console.log(err)
       res.status(500).json({ message: "Server error" }) 
    }
}

async function createTutor(req, res) {
    try {
        const {level, department, bio, courses, rating, profilePicture } = req.body
        const userId = req.user.id
        //creating a new tutor
        const newTutor = new Tutor({
            userId,
            level, 
            department, 
            bio, 
            courses, 
            rating, 
            profilePicture
        })
        //saving it to the db
        const savedTutor = await newTutor.save();
        res.json(savedTutor);
    } catch (err) {
       console.log(err)
       res.status(500).json({ message: "Server error" }) 
    }
}

async function updateTutor(req, res) {
    try {
        const exactTutor = await Tutor.findById(req.params.id)
        //chaecking if the tutor profile exists
        if (!exactTutor) {
            res.status(404).json({"message": "This tutor profile doesn't exist"})
            return;
        }
        //checking to see if this user created this tutor profile
        if (exactTutor.userId.toString() == req.user.id) {
            const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
            res.status(200).json({message: "Tutor Profile", updatedTutor})
        } else {
            res.status(403).json({ "message": "Not Allowed: You didn't create this Tutor profile 🙂"})
        }
    } catch (err) {
       console.log(err)
       res.status(500).json({ message: "Server error" })
 
    }
}

async function deleteTutor(req, res) {
    try {
        const exactTutor = await Tutor.findById(req.params.id)
        //check to see if the tutor profile even exists
        if (!exactTutor) {
            res.status(404).json({"message": "This tutor profile deosn't exist"})
            return;
        }
        //checking to see if the person actually created the tutor profile
        if (exactTutor.userId.toString() == req.user.id) {
            const deletedTutor = await Tutor.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "deleted successfully", deletedTutor})
        } else {
            res.status(403).json({ "message": "You didn't create this Tutor profile 🙂"})
        }
    } catch (err) {
       console.log(err)
       res.status(500).json({ message: "Server error" })
 
    }
}


module.exports = { getTutor, createTutor, updateTutor, deleteTutor }
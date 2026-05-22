const Tutor = require("../models/tutorModel")

async function getTutor(req, res) {
    try {
        const tutors = Tutor.find();
        res.json(tutors)
    } catch (err) {
       console.log(err) 
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
            profilePicture,
            createdBy: userId 
        })
        //saving it to the db
        const savedTutor = await newTutor.save();
        res.json(savedTutor);
    } catch (err) {
       console.log(err) 
    }
}

async function updateTutor(req, res) {
    try {
        const exactTutor = await Tutor.findById(req.params.id)
        //chaecking if the tutor profile exists
        if (!exactTutor) {
            res.status(401).json({"message": "This tutor profile doesn't exist"})
            return;
        }
        //checking to see if this user created this tutor profile
        if (exactTutor.createdBy == req.user.id) {
            const updatedTutorial = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({message: "Tutor Profile", updatedTutorial})
        } else {
            res.status(401).json({ "message": "You didn't create this Tutor profile 🙂"})
        }
    } catch (err) {
       console.log(err) 
    }
}

async function deleteTutor(req, res) {
    try {
        const exactTutor = await Tutor.findById(req.params.id)
        //check to see if the tutor profile even exists
        if (!exactTutor) {
            res.status(401).json({"message": "This tutor profile deosn't exist"})
            return;
        }
        //checking to see if the person actually created the tutor profile
        if (exactTutor.createdBy == req.user.id) {
            const deletedTutor = await Tutor.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "deleted successfully", deletedTutor})
        } else {
            res.status(401).json({ "message": "You didn't create this Tutor profile 🙂"})
        }
    } catch (err) {
       console.log(err) 
    }
}


module.exports = { getTutor, createTutor, updateTutor, deleteTutor }
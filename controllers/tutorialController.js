const Tutorial = require("../models/tutorialModel")


async function getTutorial(req, res) {
    try {
        const tutorials = Tutorial.find();
        res.json(tutorials)
    } catch (err) {
      console.log("Error detected:", err)   
    }
}

async function createTutorial(req, res) {
    try {
        const { title, tutor, course, date, time, host, location, fee } = req.body
        const userId = req.user.id
        //creting the new tutorial
        const newTutorial = new Tutorial({ 
            userId,
            title,
            tutor, 
            course, 
            date, 
            time, 
            host, 
            location, 
            fee, 
            createdBy: userId 
        })
        //saving it to the db
        const savedTutorial = await newTutorial.save()
        res.json(savedTutorial)
    } catch (err) {
        console.log(err)
    }
}

async function deleteTutorial(req, res) {
    try {
        const exactTutorial = await Tutorial.findById(req.params.id)
    //checking to see if this tutorial exists
    if (!exactTutorial) {
        res.status(401).json({"message": "Tutorial doesn't exist"})
    }
    //checking to see if this tutorial was created by the user
    if (exactTutorial.createdBy == req.user.id) {
        const deletedTutorial = await Tutorial.findByIdAndDelete(req.params.id)
        res.json({"message": "Tutorial deleted"}, deletedTutorial)
    } else {
        res.json({"message": "You didn't create this tutorial 🙂"})
    }
    } catch (err) {
        console.log(err)
    }
}



module.exports = { getTutorial, createTutorial, deleteTutorial }
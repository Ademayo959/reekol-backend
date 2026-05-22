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
        const { userId, title, tutor, course, date, time, host, location, fee } = req.body
        Tutorial.crea
    } catch (err) {
        console.log(err)
    }
}

async function deleteTutorial(req, res) {
    
}



module.exports = { getTutorial, createTutorial, deleteTutorial }
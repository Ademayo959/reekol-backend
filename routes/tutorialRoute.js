const express = require("express")
const  protect = require("../middlewares/authMiddleware");
const { getTutorial, createTutorial, deleteTutorial } = require("../controllers/tutorialController")

const router = express.Router()

router.route("/").get(getTutorial).post(protect, createTutorial)
router.route("/:id").delete(protect, deleteTutorial)

module.exports = router

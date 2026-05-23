const express = require("express")
const protect = require("../middlewares/authMiddleware")
const { getTutor, createTutor, updateTutor, deleteTutor } = require("../controllers/tutorController")

const router = express.Router();


router.route('/').get(getTutor).post(protect, createTutor)
router.route('/:id').put(protect, updateTutor).delete(protect, deleteTutor)

module.exports = router
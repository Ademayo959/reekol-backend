const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body
        //checking if the user Exists 
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.json({ "message": "A user with this email exist already" })
            return;
        }
        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // creating a user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        //save it to the db
        const savedUser = await newUser.save()
        res.json({ "message": "user saved" })
    } catch (err) {
        console.log(err)
    }

}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        //checking if the user Exists 
        const userExists = await User.findOne({ email })
        if (!userExists) {
            res.json({ "message": "user doesn't exist" })
            return;
        }
        //see if the passwords match
        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if (!passwordMatch) {
            res.json({ "message": "please enter a correct password" })
            return;
        }
        //generate a JWT token
        const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '12h' })
        res.json({
            name: userExists.name,
            JWTtoken: token
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { registerUser, loginUser }
const express = require("express")
const port = process.env.PORT || 8000
const dotenv = require('dotenv').config()
const userRoute = require("./routes/userRoute")
const tutorRoute = require("./routes/tutorRoute")
const tutorialRoute = require("./routes/tutorialRoute")
const { connectDB } = require("./config/db")
const cors = require('cors')

const app = express()

app.use(cors({
   origin: "https://reekol.vercel.app"
}))

app.use(express.json())
app.use('/user', userRoute)
app.use('/tutor', tutorRoute)
app.use('/tutorials', tutorialRoute)

connectDB()

app.listen(port, () => {
    console.log(`server started on port: ${port}`)
    
})
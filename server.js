const express = require("express")
const port = process.env.PORT || 8000
const dotenv = require('dotenv').config()
const { connectDB } = require("./config/db")

const app = express()

app.use(express.json())


app.listen(port, () => {
    console.log(`server started on port: ${port}`)
    connectDB()
})
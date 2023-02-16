const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT | 8000
const connectDb = require('./config/db.connect')
const dotenv = require('dotenv').config()

// receive data from database
connectDb()
//accept middleware
app.use(express.json())
app.use("/api/users", require("./routes/user/user.routes"))
app.use("/api/contacts", require("./routes/contact/contact.routes"))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is runing at localhost:${port}`)
})
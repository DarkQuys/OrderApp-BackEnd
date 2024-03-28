const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
dotenv.config()
const app = express()
app.use(cookieParser())
app.use(cors())
const port = 3003 
app.use(bodyParser.json())
routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => console.log('Connected!')) 
    .catch ((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server Runing in port ',port)
})
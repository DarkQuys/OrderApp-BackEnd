const express = require("express");
const router = express.Router()
const createUser = require('../controllers/UserController')
router.post('/createuser', createUser.createUser)
    
module.exports= router 
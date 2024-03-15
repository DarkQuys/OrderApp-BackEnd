const express = require("express");
const router = express.Router()
const createUser = require('../controllers/UserController')
router.post('/user/he', createUser.createUser)
    
module.exports= router 
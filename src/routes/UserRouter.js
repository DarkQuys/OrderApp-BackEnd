const express = require("express");
const router = express.Router()
const createUser = require('../controllers/UserController')
const authMiddleWare = require('../middleware/authMiddleWare')
router.post('/createuser', createUser.createUser)
router.post('/loginuser', createUser.loginUser )
router.post('/logout', createUser.logOut)
router.put('/updateuser/:id',createUser.updateUser)
router.delete('/deleteuser/:id' , authMiddleWare.authMiddleWare,createUser.deleteUser)
router.get('/getalluser' , createUser.getAllUser)
router.get('/getuser/:id',authMiddleWare.authUserMiddleWare ,createUser.getUser)
router.post('/refresh',createUser.refreshToken)
router.post('/delete-many',authMiddleWare.authUserMiddleWare,createUser.deleteManyUser)
module.exports= router 
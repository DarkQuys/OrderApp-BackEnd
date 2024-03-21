const userService = require('../services/createService')
const User = require('../models/UserModels')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const createUser = async (req, res) => {
    const {name , email } = req.body
    try { 
        console.log(req.body)
        //const respon = await userService.createUser()
        const hash = bcrypt.hashSync(req.body.password, salt)
        console.log(hash)
        const password = hash 
        const createe = User.create({
            name,
            email,
            password
        })
        if (createe) {
            return res.status(200).json('YES')
        }
        return res.status(200).json('NO')
    } catch (e) {
        return res.status(404).json({
            massage : e
        })
    }
}
module.exports = {
    createUser
}
const userService = require('../services/createService')
const User = require('../models/UserModels')
var bcrypt = require('bcryptjs');
const jwtService = require('../services/jwtService')
var salt = bcrypt.genSaltSync(10);
const createUser = async (req, res) => {
    try { 
        //console.log(req.body)
        //const respon = await userService.createUser()
        //const hash = bcrypt.hashSync(req.body.password, salt)
        const hi = await userService.createUser(req.body)
        // if (createe) {
        //     return res.status(200).json('YES')
        // }
        return res.status(200).json(hi)
    } catch (e) {
        return res.status(404).json({
            massage : e
        })
    }
}
const loginUser = async (req , res) =>{
    try{
        const response = await userService.loginuser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            secure: false,
            sameSite: 'strict',
            
        })
        return res.status(200).json(newResponse)
    }catch(e){
        return res.status(404).json({
            message :e 
        })
    }
}
const updateUser =async(req, res)=>{
        try{
            const userId = await req.params.id 
            console.log(userId)
            const data =await req.body
            console.log(data)
            const respon =  await userService.updateUser(userId, data)
            return res.status(200).json(respon)
        }catch(e){
            return res.status(404).json({
                message : e 
            })
        }
}
const deleteUser= async(req, res )=>{
        try{
            const userId = req.params.id 
            console.log(userId)
            const respon = await userService.deleteUser(userId)
            return res.status(200).json(respon)
        }catch(e){
          return res.status(404).json({
            message : e 
          })
        }
}
const deleteManyUser= async(req, res )=>{
    try{
        const userId = req.body
        console.log(userId)
        const respon = await userService.deleteManyUser(userId)
        return res.status(200).json(respon)
    }catch(e){
      return res.status(404).json({
        message : e 
      })
    }
}
const getAllUser =async(req ,res )=>{
        try{ 
            const respon = await userService.getAllUser()
            return res.status(200).json(respon)
        }
        catch(e){
            return res.status(404).json({
                message :e
            })

        }
}
const getUser =async(req ,res )=>{
    try{ 
        const respon = await userService.getUser(req.params.id ,)
        return res.status(200).json(respon)
    }
    catch(e){
        return res.status(404).json({
            message :e
        })

    }
}
const refreshToken = async(req ,res)=>{
    try{ 
        //const token = await req.headers.token.split(' ')[1]
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(404).json({
                status : "Not token"
            })
        }
        const respon = await jwtService.refreshToken(token)
        return res.status(200).json(respon)
    }
    catch(e){
        return res.status(404).json({
            message :e
        })

    }

}
const logOut = async(req , res)=>{
    try{
        res.clearCookie('refresh_token')
        return res.status(200).json({
            message : "Good"
        })
    }catch(e){
        return req.status(404).json({
            message : e
        })
    }   

}
module.exports = {
    createUser,
    loginUser ,
    updateUser ,
    deleteUser,
    getAllUser,
    getUser ,
    refreshToken ,
    logOut,
    deleteManyUser
}
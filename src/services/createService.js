const User = require('../models/UserModels')
var bcrypt = require('bcryptjs')
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService')
var salt = bcrypt.genSaltSync(10)
const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const {name , email } = newUser 
        try {
            console.log(newUser)
            const hash = bcrypt.hashSync(newUser.password , salt)
            const password = hash 
           
            const createdUser =await User.create({
                name,
                email, 
                password  
            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "GOOD" ,
                    data :createdUser
                })
            }
         
        } catch (e) {
            reject(e)
        }
    })
}
const loginuser = (userlogin)=>{
    return new Promise (async(resolve , reject)=>{
        try{
       
         const user =await User.findOne({
             email : userlogin.email
         })
         if (bcrypt.compareSync( userlogin.password , user.password)){
            console.log('succsess')
        }
        console.log(userlogin.password)
         console.log(user)
        const access_token =await genneralAccessToken({
            id : user.id ,
            isAdmin : user.isAmin 
        } )
        const refresh_token = await genneralRefreshToken({
            id :user.id,
            isAdmin : user.isAmin
        })
        
         if (user){
            resolve({
                statua :'ok',
                data : user  ,
                access_token ,
                refresh_token
            })
         }
       
        }catch(e){
             reject(e)
        }
     })
}
const updateUser = (userId ,data )=>{
    return new Promise(async(resolve ,reject)=>{
        try{
           const upp = await User.findByIdAndUpdate(userId , data ,{new :true})
           if (upp){
            resolve({
                status : 'UPDATE DONE'
            })
           }
        }catch(e){
            reject(e)
        }
    })
}
const deleteUser = (userId)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const checkUser = await User.findOne({
                _id : userId
            })
            const dele = await User.findByIdAndDelete(userId)
           
            console.log(checkUser)
            if(dele){
                resolve({
                    message:"DELETED DONE"
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

const getAllUser = ()=>{
    return new Promise (async(resolve , reject)=>{
        try{
            const allUser =await User.find()
            if(!allUser){
                resolve({
                    status : 'NOT'
                })
            }
            resolve({
                status : "YES" ,
                data : allUser
            })
        }
        catch(e){
            reject(e)
        }
    })
}
const getUser = (id)=>{
    return new Promise (async(resolve , reject)=>{
        try{
           const user = await User.findOne({
            _id : id 
           })
           
           resolve({
            data : user
        
           })
        }
        catch(e){
            reject(e)
        }
    })

}
module.exports = {
    createUser ,
    loginuser ,
    updateUser,
    deleteUser,
    getAllUser,
    getUser
}
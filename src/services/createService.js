const User = require('../models/UserModels')
const createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const {name , email , password , confimPassword, phone} = newUser 
        try {
            const createdUser = User.create({
                name,
                email, 
                password,
                confimPassword,
                phone
            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "GOOD" ,
                    date :createUser 
                })
            }
         
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String ,required: true ,inque:true },
        password: { type: String,required: true },
        isAmin: { type: Boolean,default :true, required: true },
        phone : {type : Number} ,
        address : {type : String} ,
        avatar :{type : String}
    },
    {
        timestamps :true 
    }
)
const User = mongoose.model("User", userSchema)
module.exports =User
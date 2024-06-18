const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems : [
       { name : {type : String , required : true},
       amount : {type : Number , required : true},
       image : {type : String , required : true},
       price : {type : Number , required : true},
       product :{
            type : mongoose.Schema.Types.ObjectId , 
            ref :'Product',
            require:true
       }
    
    }
    ]

})
const Order = mongoose.model('Order' , orderSchema)
module.exports = Order
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
const authMiddleWare = (req , res, next)=>{
    const token  = req.headers.token.split(' ')[1]
    console.log(token)
    jwt.verify(token , process.env.ACCESS_TOKEN ,(err , user)=>{
        if(err){
            return res.status(404).json({
                status : 'error1'
            })
        }
        const {payload} = user 
        console.log(payload)
        if (payload.isAdmin){
            console.log('good')
            next()
        }
        else{
            return res.status(404).json({
                status : 'error2'
            })
        }
    })

    
}
const authUserMiddleWare =(req ,res ,next)=>{ 
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id 
    jwt.verify(token , process.env.ACCESS_TOKEN ,(err , user)=>{
        if(err){
            return res.status(404).json({
                status : 'errored'
            })
        }
        const {payload} = user 
        if(payload.id === userId || payload.isAdmin === true)
        {
            next()
        }
    })

}
module.exports ={
    authMiddleWare , 
    authUserMiddleWare
}
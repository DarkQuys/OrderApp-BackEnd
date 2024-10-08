const productService = require('../services/productService')
const Product = require('../models/ProductModels')
const createProduct =async(req ,res)=>{
    try{    
        const respon =await productService.createProduct(req.body)
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({
            status : "haha"
        })
    }
}
const updateProduct =async(req ,res)=>{
    try{
        const idProduct = req.params.id
        const respon =await productService.updateProduct(idProduct, req.body)
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({
            status : "haha"
        })
    }
}
const deleteProduct =async(req ,res)=>{
    try{
        const idProduct = req.params.id
        const respon =await productService.deleteProduct(idProduct)
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({
            status : "haha"
        })
    }
}
const deleteManyProduct =async(req ,res)=>{
    try{
        const idProduct = req.body
        const respon =await productService.deleteManyProduct(idProduct)
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({
            status : "haha"
        })
    }
}
const getProduct =async(req ,res)=>{
    try{
        const idProduct = req.params.id
        const respon =await productService.getProduct(idProduct)
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({
            status : "haha"
        })
    }
}
const getAllProduct =async(req ,res)=>{
    try{  
        const {limit , page ,sort ,filter} = req.query
        console.log(limit , page , filter)
        const respon =await productService.getAllProduct(Number(limit), Number(page),sort ,filter)
        return res.status(200).json(respon)
        // return res.status(200).json({
        //     status :'so good'
        // })
    }catch(e){
        return res.status(404).json({
            status : "haha",
            
        })
    }
}
const getAllType =async(req ,res)=>{
    try{  
        const respon =await productService.getAllType()
        return res.status(200).json(respon)
        // return res.status(200).json({
        //     status :'so good'
        // })
    }catch(e){
        return res.status(404).json({
            status : "haha",
            
        })
    }
}






module.exports ={
    createProduct ,
    updateProduct ,
    deleteProduct ,
    getProduct ,
    getAllProduct,
    deleteManyProduct,
    getAllType,
}
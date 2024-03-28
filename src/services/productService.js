const Product = require('../models/ProductModels')
const createProduct = (data)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const {name , image , type , price , countInStock , rating , description } = data
            console.log(data) 
            console.log(name , image ,price ,countInStock)
            const newProduct =await Product.create({
                name , image , type, price , countInStock , rating , description 
            })
        resolve({
            status : "so good" ,
            product : newProduct
        })
        }
        catch(e){
            reject(e)
        }
    })
}
const updateProduct = ( idProduct,data)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const newProduct = await Product.findByIdAndUpdate(idProduct , data ,{new :true})
        resolve({
            status : "so good" ,
            product : newProduct
        })
        }
        catch(e){
            reject(e)
        }
    })
}
const deleteProduct = ( idProduct)=>{
    return new Promise(async(resolve , reject)=>{
        try{
        await Product.findByIdAndDelete(idProduct)
        resolve({
            status : "so good" ,
        })
        }
        catch(e){
            reject(e)
        }
    })
}
const getProduct = ( idProduct)=>{
    return new Promise(async(resolve , reject)=>{
        try{
        const thisProduct = await Product.findOne({
            _id : idProduct
        })
        resolve({
            status : "so good" ,
            product : thisProduct
        })
        }
        catch(e){
            reject(e)
        }
    })
}
const getAllProduct = (limit , page ,sort ,filter )=>{
    return new Promise(async(resolve , reject)=>{
        try{
        //const totalPage  = await Product.count()
            //console.log(totalPage)
            
            if (filter) {
                console.log(filter )
            const label = filter[0]
            const productFilter = await Product.find({[label]: {'$regex' : filter[1]}})
            //const totalPage = await Product.countDocuments()
            resolve({
                status : "so good" ,
                product : productFilter 
            })
        }
            if (sort) {
                const oj = {}
                oj[sort[1]]=sort[0]
                const thisProduct = await Product.find().limit(limit).skip(page*limit).sort(oj)
                const totalPage = await Product.countDocuments()
                console.log(typeof limit)
                resolve({
                    status : "so good" ,
                    product : thisProduct , 
                    total :totalPage,
                    pageCurrent :page+1 ,
                    totalPage : Math.ceil(totalPage/limit)
                })
            }
            if (!sort) {
                const all = await Product.find()
                resolve({
                    data: all
                })
            }
           
        }
      
       
        catch(e){
            reject(e)
        }
    })
}
module.exports ={
    createProduct ,
    updateProduct ,
    deleteProduct ,
    getProduct,
    getAllProduct
}
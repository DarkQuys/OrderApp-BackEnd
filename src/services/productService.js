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
const deleteManyProduct = ( ids )=>{
    return new Promise(async(resolve , reject)=>{
        try{
        await Product.deleteMany({_id : ids})
        resolve({
            status : "DELETE PRODUCT MANY" ,
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
            //const totalProduct = await Product.count()
            if (filter) {
            const label = filter[0]
            const productFilter = await Product.find({[label]: {'$regex' : filter[1]}}).limit(limit).skip(page*limit)
            resolve({
                status : "so good" ,
                data : productFilter ,
                total : productFilter.length,
                //total2: totalProduct
                //totalPage : Math.ceil(totalPage/limit)
                //total :totalPage,
            })
        }
            if (sort) {
                const oj = {}
                oj[sort[1]]=sort[0]
                const thisProduct = await Product.find().limit(limit).skip(page*limit).sort(oj)
                //const totalPage = await thisProduct.countDocuments()
                console.log(typeof limit)
                resolve({
                    status : "so good" ,
                    data : thisProduct , 
                    total :totalProduct,
                    pageCurrent :Number(page+1) ,
                    totalPage : Math.ceil(totalProduct/limit)
                    //totalPage : Math.ceil(totalPage/limit)
                })
            }
            else{
                const allProduct = await Product.find().limit(limit).skip(page*limit)
                resolve({
                        status : "so good" ,
                        data : allProduct , 
                        pageCurrent :Number(page+1) ,
                        //totalPage : Math.ceil(totalProduct/limit)
    
                })
            }
          
           
        }
      
       
        catch(e){
            reject(e)
        }
    })
}
const getAllType = ()=>{
    return new Promise(async(resolve , reject)=>{
        try{
        const allType = await Product.distinct('type')
        resolve({
            status : "so good" ,
            alltype : allType
        })
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
    getAllProduct,
    deleteManyProduct,
    getAllType
}
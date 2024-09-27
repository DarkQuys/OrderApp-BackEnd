const express = require('express') 
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.post('/createproduct' , ProductController.createProduct)
router.put('/updateproduct/:id' ,ProductController.updateProduct )
router.delete('/deleteproduct/:id',ProductController.deleteProduct)
router.get('/getproduct/:id', ProductController.getProduct)
router.get('/getallproduct', ProductController.getAllProduct)
router.post('/delete-many',ProductController.deleteManyProduct)
router.get('/get-all-type' ,ProductController.getAllType)

module.exports = router

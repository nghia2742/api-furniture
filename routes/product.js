const productController = require('../app/controller/productController')
const router = require('express').Router()

router.get('/',productController.index)

router.get('/:slug',productController.getProductDetail)

router.post('/',productController.getProductByIds)



module.exports = router
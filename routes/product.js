const ProductController = require('../app/controllers/productController');
const express = require('express');

const router = express.Router();

router.get('/', ProductController.index);

router.post('/', ProductController.createProduct);

module.exports = router;

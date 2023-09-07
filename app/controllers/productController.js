const Product = require('../models/productModel');

class ProductController {
    async index(req, res) {
        try {
            const Products = await Product.find({});
            res.status(200).json(Products);
        } catch (err) {
            console.log(err);
            res.status(500).json({ Message: 'Error Product' });
        }
    }

    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({ Message: 'Error Create Product'});
        }
    }
}

module.exports = new ProductController();

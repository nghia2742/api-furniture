const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: {type:String},
        image: {type:String},
        price: {type: Number},
        category: {type:String},
    } , {
        timestamps: true,
    }
)
module.exports = mongoose.model('Product', Product)
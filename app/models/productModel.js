const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {type: String},
        image: {type: String},
        price: {type: Number},
        category: {type:String}
    } , {
        timestamps: true,
    }
)
module.exports = mongoose.model('Product', productSchema)
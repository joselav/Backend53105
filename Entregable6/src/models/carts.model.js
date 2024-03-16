const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id_prod: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'products',
                required: true
            },
             quantity: {
                type: Number,
                required: true, 
        }
        }]
    }
})

const CartModel = mongoose.model('carts', cartSchema);

module.exports= CartModel;
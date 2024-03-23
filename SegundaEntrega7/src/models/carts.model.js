const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [{
        id_prod: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

cartSchema.pre('findOne', function (next) {
    this.populate('products.id_prod');
    next();
});


const CartModel = mongoose.model('carts', cartSchema);

module.exports= CartModel;
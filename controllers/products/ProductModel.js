const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    idCategory: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
    role: {type: Number, requied: true},
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});


module.exports = mongoose.models.product || mongoose.model('product', ProductSchema)
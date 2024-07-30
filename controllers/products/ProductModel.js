const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    type: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
    role: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.models.product || mongoose.model('product', ProductSchema)
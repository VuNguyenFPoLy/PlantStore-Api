const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
})


module.exports = mongoose.models.category || mongoose.model('category', CategorySchema);



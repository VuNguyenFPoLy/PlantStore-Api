const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
    name: {type: String, required: true},
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.models.search || mongoose.model('search', SearchSchema)

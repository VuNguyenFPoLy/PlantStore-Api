const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    products: { type: Array, default: [], required: true },
    shipFunction: { type: String, required: true },
    payFunction: { type: String, required: true },
    sumPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.transaction || mongoose.model('transaction', TransactionSchema);
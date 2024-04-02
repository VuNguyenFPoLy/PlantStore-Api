const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    idProduct: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    status: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
})

module.exports = mongoose.models.notification || mongoose.model('notification', NotificationSchema)
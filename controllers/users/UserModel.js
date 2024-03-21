const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: Number, default: 1 },
    avatar: {type: String, default: ''},
    carts: { type: Array, default: [] },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
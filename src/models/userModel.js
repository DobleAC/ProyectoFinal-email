const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: Object, require: false },
    tel: { type: String, require: false },
    registerDate: { type: Date, default: new Date },
    userType: { type: String, default: 'CLIENT' },
    paymentMethod: { type: Array, require: false },
    tax_id: { type: String, require: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de Usuario
        required: true,
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Referencia al modelo de Producto
        required: true
    }],
    subtotal: {
        type: Number,
        required: true,
        default: 0,
    },
    iva: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    estatus: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente',
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_cierre: {
        type: Date,
        default: null
    },
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;

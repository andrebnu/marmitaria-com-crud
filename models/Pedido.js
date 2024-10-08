 
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    marmita: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;

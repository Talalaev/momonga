const mongoose = require("mongoose");

let buyingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Buying', buyingSchema);
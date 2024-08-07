const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
    operation: String,
    result: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calculation', CalculationSchema);

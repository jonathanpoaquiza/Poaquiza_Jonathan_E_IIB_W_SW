const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

router.get('/', async (req, res) => {
    const calculations = await Calculation.find();
    res.json(calculations);
});

router.post('/', async (req, res) => {
    const { operation, result } = req.body;
    const newCalculation = new Calculation({ operation, result });
    await newCalculation.save();
    res.status(201).json(newCalculation);
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/calculadora')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB', error);
  });

// Modelo de Cálculo
const Calculation = require('./models/Calculation');

// Función para realizar las operaciones
const performOperation = (operation, number1, number2) => {
  switch (operation) {
    case 'sum':
      return number1 + number2;
    case 'subtract':
      return number1 - number2;
    case 'multiply':
      return number1 * number2;
    case 'divide':
      return number1 / number2;
    case 'power':
      return Math.pow(number1, number2);
    case 'sqrt':
      return Math.sqrt(number1);
    default:
      throw new Error('Operación no soportada');
  }
};

// Ruta para manejar las operaciones de cálculo
app.get('/api/calculate/:operation', (req, res) => {
  const { operation } = req.params;
  const number1 = parseFloat(req.headers.number1);
  const number2 = parseFloat(req.headers.number2);

  try {
    const result = performOperation(operation, number1, number2);
    const newCalculation = new Calculation({ operation, result });
    newCalculation.save()
      .then(() => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al guardar el cálculo' });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

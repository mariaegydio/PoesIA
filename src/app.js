const express = require('express');
require('dotenv').config();
const connectDB = require('../config/db'); 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Poemas funcionando');
});

connectDB(); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); // Importa a conexão modularizada

const app = express();

// Middleware
app.use(express.json());

// Rota simples de teste
app.get('/', (req, res) => {
  res.send('API de Poemas funcionando');
});

// Conexão com o Banco de Dados
connectDB(); // Chama a função de conexão

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
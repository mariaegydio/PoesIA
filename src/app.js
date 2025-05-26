const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado ao banco:', mongoose.connection.name))
  .catch(err => {
    console.error('❌ Erro na conexão com MongoDB:', err.message);
    process.exit(1);
  });

mongoose.connection.on('connected', () => {
  console.log('✅ Conexão estabelecida com MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro na conexão MongoDB:', err);
});

app.get('/', (req, res) => {
  res.send('API Gerador de Poemas operacional!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('OPENAI_KEY:', process.env.OPENAI_API_KEY ? '✔️ Configurada' : '❌ Ausente');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✔️ Configurada' : '❌ Ausente');
});
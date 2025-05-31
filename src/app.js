const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const poemRoutes = require('./routes/poemRoutes');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.OPENAI_API_KEY || !process.env.MONGODB_URI) {
  console.error('❌ Variáveis ausentes no .env! Verifique OPENAI_API_KEY e MONGODB_URI');
  process.exit(1);
}

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => {
    console.error('❌ Falha no MongoDB:', err.message);
    process.exit(1);
  });

app.use(express.json());

app.use('/api/poems', poemRoutes);

app.get('/', (req, res) => res.json({ 
  status: 'online',
  endpoints: {
    generate: 'POST /api/poems/generate',
    list: 'GET /api/poems'
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
==================================
🚀 Servidor rodando na porta ${PORT}
==================================
  `);
});
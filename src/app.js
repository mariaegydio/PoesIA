const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs'); // Para verificação do arquivo

// 1. Configuração ABSOLUTA do .env
const envPath = path.resolve(__dirname, '../.env');

// Verificação EXTRA do arquivo .env
if (!fs.existsSync(envPath)) {
  console.error('❌ ERRO CRÍTICO: Arquivo .env não encontrado em:', envPath);
  process.exit(1);
}

// Carrega as variáveis COM GARANTIA
require('dotenv').config({ path: envPath });

// 2. Verificação EXPLÍCITA das variáveis
const requiredVars = ['OPENAI_API_KEY', 'MONGODB_URI'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Variável ${varName} ausente no .env`);
    process.exit(1);
  }
});

// 3. Inicialização do app
const app = express();

// 4. Conexão ROBUSTA com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    process.exit(1);
  });

// 5. Middlewares
app.use(express.json());

// 6. Rotas Básicas (TESTE)
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    varsLoaded: {
      openai: !!process.env.OPENAI_API_KEY,
      mongo: !!process.env.MONGODB_URI
    }
  });
});

// 7. Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ==================================
  🚀 Servidor rodando na porta ${PORT}
  📍 Endpoints:
  - http://localhost:${PORT}
  - http://localhost:${PORT}/api/poems
  ==================================
  `);
});
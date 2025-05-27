const express = require('express');
const router = express.Router();
const { generatePoem } = require('../services/openai');
const Poem = require('../models/Poem');

router.post('/generate', async (req, res) => {
  const { theme } = req.body;
  
  if (!theme || typeof theme !== 'string') {
    return res.status(400).json({ error: "Tema inválido ou não fornecido" });
  }

  try {
    const poem = await generatePoem(theme);
    
    const savedPoem = await Poem.create({ 
      theme,
      content: poem,
      createdAt: new Date()
    });

    res.status(201).json({
      id: savedPoem._id,
      theme: savedPoem.theme,
      poem: savedPoem.content,
      createdAt: savedPoem.createdAt
    });

  } catch (error) {
    console.error("Erro completo:", error);
    res.status(500).json({ 
      error: "Erro ao gerar poema",
      details: error.message 
    });
  }
});

module.exports = router;
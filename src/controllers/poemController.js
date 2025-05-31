const Poem = require('../models/Poem');
const { generatePoem } = require('../services/openai');
const { analyzeSentiment } = require('../services/sentimentAnalysis');

const generatePoemHandler = async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({ error: "O campo 'theme' é obrigatório" });
    }

    const poemContent = await generatePoem(theme);
    const sentiment = analyzeSentiment(poemContent);

    const newPoem = await Poem.create({ 
      theme, 
      content: poemContent, 
      sentiment 
    });

    res.status(201).json(newPoem);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: 'Verifique sua chave OpenAI e conexão com MongoDB'
    });
  }
};

const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.json(poems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  generatePoem: generatePoemHandler, 
  getAllPoems 
};
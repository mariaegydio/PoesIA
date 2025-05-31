const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  theme: { 
    type: String, 
    required: [true, 'O tema é obrigatório'] 
  },
  content: { 
    type: String, 
    required: [true, 'O conteúdo é obrigatório'] 
  },
  sentiment: { 
    type: String, 
    enum: ['positivo', 'neutro', 'negativo'],
    default: 'neutro'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Poem', PoemSchema);
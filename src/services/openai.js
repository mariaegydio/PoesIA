const { OpenAI } = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY não encontrada - Verifique o .env');
}

const openai = new OpenAI({
  apiKey: apiKey,
  organization: 'org-seu-id' 
});

const generatePoem = async (theme) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Escreva um poema curto sobre ${theme} em português com rimas.`
      }],
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na OpenAI:', error);
    throw new Error(`Falha ao gerar poema: ${error.message}`);
  }
};

module.exports = { generatePoem };
const { OpenAI } = require('openai');

const apiKey = process.env.OPENAI_API_KEY || "COLE_SUA_CHAVE_DIRETAMENTE_AQUI_SE_PRECISAR";

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
        content: `Escreva um poema sobre ${theme} em português com 4 estrofes e rimas.`
      }],
      temperature: 0.7,
      max_tokens: 300
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na OpenAI:', error);
    throw new Error('Falha ao gerar poema. Verifique a chave API.');
  }
};

module.exports = { generatePoem };
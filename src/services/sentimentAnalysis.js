const natural = require('natural');
const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = natural;
const tokenizer = new WordTokenizer();

const analyzer = new SentimentAnalyzer('Portuguese', PorterStemmer, 'afinn');

const analyzeSentiment = (text) => {
  try {
    const tokens = tokenizer.tokenize(text);
    const score = analyzer.getSentiment(tokens);
    return score > 0.3 ? 'positivo' : score < -0.3 ? 'negativo' : 'neutro';
  } catch (error) {
    console.error('Erro na análise de sentimento:', error);
    return 'neutro';
  }
};

module.exports = { analyzeSentiment };
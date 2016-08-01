const bookshelf = require('../config/bookshelf');
const User = require('./User');
const Pergunta = require('./Pergunta');

const RespostaPrioridade = bookshelf.Model.extend({
  tableName: 'respostasPrioridades',
  hasTimestamps: true,
  userId: () => this.belongsTo(User),
  pergunta: () => this.belongsTo(Pergunta)
});

module.exports = RespostaPrioridade;

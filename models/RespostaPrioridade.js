var bookshelf = require('../config/bookshelf');

var RespostaPrioridade = bookshelf.Model.extend({
  tableName: 'respostasPrioridades',
  hasTimestamps: true,

  user: function () {
    return this.belongsTo(User);
  },
  pergunta: function () {
    return this.belongsTo(Pergunta);
  }
});

module.exports = RespostaPrioridade;

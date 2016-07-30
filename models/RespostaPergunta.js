var bookshelf = require('../config/bookshelf');

var Prioridade = bookshelf.Model.extend({
  tableName: 'respostasPerguntas',
  hasTimestamps: true
});

module.exports = Prioridade;

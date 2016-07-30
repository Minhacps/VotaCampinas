var bookshelf = require('../config/bookshelf');

var Pergunta = bookshelf.Model.extend({
  tableName: 'perguntas',
  hasTimestamps: true
});

module.exports = Pergunta;

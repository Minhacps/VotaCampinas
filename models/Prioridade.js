var bookshelf = require('../config/bookshelf');

var Prioridade = bookshelf.Model.extend({
  tableName: 'prioridades',
  hasTimestamps: true
});

module.exports = Prioridade;

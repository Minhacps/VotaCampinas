const bookshelf = require('../config/bookshelf');

const Partido = bookshelf.Model.extend({
  tableName: 'partidos'
});

module.exports = Partido;

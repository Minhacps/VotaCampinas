var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Vereador = bookshelf.Model.extend({
  tableName: 'vereadores',
  hasTimestamps: true,
  userId: () => this.belongsTo(User)
});

module.exports = Vereador;

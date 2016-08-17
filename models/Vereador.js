var bookshelf = require('../config/bookshelf');
var User = require('./User');
var Partido = require('./Partido');

var Vereador = bookshelf.Model.extend({
  tableName: 'vereadores',
  hasTimestamps: true,
  userId: () => this.belongsTo(User),
  partidoId: () => this.belongsTo(Partido)
});

module.exports = Vereador;

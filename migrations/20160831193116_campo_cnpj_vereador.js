exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('vereadores', function (table) {
      table.dropColumn('codigoJusticaEleitoral');
      table.string('cnpj', 18);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('respostasPerguntas')
  ]);
};

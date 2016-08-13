exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('respostasPerguntas', function (table) {
      table.string('justificativa');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('respostasPerguntas')
  ]);
};

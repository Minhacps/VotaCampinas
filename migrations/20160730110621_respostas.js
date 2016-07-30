exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('respostasPerguntas', function (table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('perguntaId').unsigned().references('id').inTable('perguntas');
      table.integer('resposta').unsigned();
      table.timestamps();
    }),
    knex.schema.createTable('respostasPrioridades', function (table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('prioridadeId').unsigned().references('id').inTable('prioridades');
      table.timestamps();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('respostasPerguntas'),
    knex.schema.dropTable('respostasPrioridades')
  ]);
};

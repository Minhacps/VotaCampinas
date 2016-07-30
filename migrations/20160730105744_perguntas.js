exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('perguntas', function (table) {
      table.increments('id').primary();
      table.string('pergunta');
      table.timestamps();
    }),
    knex.schema.createTable('prioridades', function (table){
      table.increments('id').primary();
      table.string('prioriade');
      table.timestamps();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('perguntas'),
    knex.schema.dropTable('prioridades'),
  ]);
};

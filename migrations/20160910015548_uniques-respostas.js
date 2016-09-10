exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('respostasPerguntas', function (table) {
      table.unique(['userId', 'perguntaId']);
    }),

    knex.schema.table('respostasPrioridades', function (table) {
      table.unique(['userId', 'prioridadeId']);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('respostasPerguntas', function (table) {
      table.dropUnique(['userId', 'perguntaId']);
    }),

    knex.schema.table('respostasPrioridades', function (table) {
      table.dropUnique(['userId', 'prioridadeId']);
    }),
  ]);
};

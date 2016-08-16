exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('vereadores', (table) => {
      table.integer('partidoId').unsigned().references('id').inTable('partidos');
      table.dropColumn('partido');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('vereadores')
  ]);
};

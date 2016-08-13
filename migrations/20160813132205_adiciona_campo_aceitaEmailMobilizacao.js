exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.boolean('aceitaEmailsMobilizacao');
      table.dropColumn('birthDate');
      table.dropColumn('gender');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};

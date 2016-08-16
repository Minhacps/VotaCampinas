exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('partidos', (table) => {
      table.increments('id').primary();
      table.string('nome');
      table.string('sigla');
      table.integer('numero');
    }),
    knex('partidos').insert([
      {sigla: 'PMDB', nome: 'PARTIDO DO MOVIMENTO DEMOCRÁTICO BRASILEIRO', numero: 15},
      {sigla: 'PTB', nome: 'PARTIDO TRABALHISTA BRASILEIRO', numero: 14},
      {sigla: 'PDT', nome: 'PARTIDO DEMOCRÁTICO TRABALHISTA', numero: 12},
      {sigla: 'PT', nome: 'PARTIDO DOS TRABALHADORES', numero: 13},
      {sigla: 'DEM', nome: 'DEMOCRATAS', numero: 25},
      {sigla: 'PCdoB', nome: 'PARTIDO COMUNISTA DO BRASIL', numero: 65},
      {sigla: 'PSB', nome: 'PARTIDO SOCIALISTA BRASILEIRO', numero: 40},
      {sigla: 'PSDB', nome: 'PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA', numero: 45},
      {sigla: 'PTC', nome: 'PARTIDO TRABALHISTA CRISTÃO', numero: 36},
      {sigla: 'PSC', nome: 'PARTIDO SOCIAL CRISTÃO', numero: 20},
      {sigla: 'PMN', nome: 'PARTIDO DA MOBILIZAÇÃO NACIONAL', numero: 33},
      {sigla: 'PRP', nome: 'PARTIDO REPUBLICANO PROGRESSISTA', numero: 44},
      {sigla: 'PPS', nome: 'PARTIDO POPULAR SOCIALISTA', numero: 23},
      {sigla: 'PV', nome: 'PARTIDO VERDE', numero: 43},
      {sigla: 'PTdoB', nome: 'PARTIDO TRABALHISTA DO BRASIL', numero: 70},
      {sigla: 'PP', nome: 'PARTIDO PROGRESSISTA', numero: 11},
      {sigla: 'PSTU', nome: 'PARTIDO SOCIALISTA DOS TRABALHADORES UNIFICADO', numero: 16},
      {sigla: 'PCB', nome: 'PARTIDO COMUNISTA BRASILEIRO', numero: 21},
      {sigla: 'PRTB', nome: 'PARTIDO RENOVADOR TRABALHISTA BRASILEIRO', numero: 28},
      {sigla: 'PHS', nome: 'PARTIDO HUMANISTA DA SOLIDARIEDADE', numero: 31},
      {sigla: 'PSDC', nome: 'PARTIDO SOCIAL DEMOCRATA CRISTÃO', numero: 27},
      {sigla: 'PCO', nome: 'PARTIDO DA CAUSA OPERÁRIA', numero: 29},
      {sigla: 'PTN', nome: 'PARTIDO TRABALHISTA NACIONAL', numero: 19},
      {sigla: 'PSL', nome: 'PARTIDO SOCIAL LIBERAL', numero: 17},
      {sigla: 'PRB', nome: 'PARTIDO REPUBLICANO BRASILEIRO', numero: 10},
      {sigla: 'PSOL', nome: 'PARTIDO SOCIALISMO E LIBERDADE', numero: 50},
      {sigla: 'PR', nome: 'PARTIDO DA REPÚBLICA', numero: 22},
      {sigla: 'PSD', nome: 'PARTIDO SOCIAL DEMOCRÁTICO', numero: 55},
      {sigla: 'PPL', nome: 'PARTIDO PÁTRIA LIVRE', numero: 54},
      {sigla: 'PEN', nome: 'PARTIDO ECOLÓGICO NACIONAL', numero: 51},
      {sigla: 'PROS', nome: 'PARTIDO REPUBLICANO DA ORDEM SOCIAL', numero: 90},
      {sigla: 'SD', nome: 'SOLIDARIEDADE', numero: 77},
      {sigla: 'NOVO', nome: 'PARTIDO NOVO', numero: 30},
      {sigla: 'REDE',	nome: 'REDE SUSTENTABILIDADE', numero: 18},
      {sigla: 'PMB', nome: 'PARTIDO DA MULHER BRASILEIRA', numero: 35}
    ])
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('partidos')
  ]);
};

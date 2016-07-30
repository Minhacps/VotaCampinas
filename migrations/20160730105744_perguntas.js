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
    }),

    //seeds de perguntas
    knex('perguntas').insert([
      {id:1, pergunta:"A atual gestão municipal realizou um combate eficiente ao mosquito da dengue."},
      {id:2, pergunta:"Programa Mais Médicos. (Programa do governo federal que estabelece parceria com outros países para vinda de médicos para o Brasil.)"},
      {id:3, pergunta:"Descriminalização do consumo da maconha."},
      {id:4, pergunta:"Os centros de saúde tem uma estrutura adequada para atendimento à população."},
      {id:5, pergunta:"Naves-mães. Ampliação da  oferta  de  vagas  na  educação  infantil  em parceria com instituições de direito privado sem fins lucrativos, ou seja com instituições comunitárias, confessionais e filantrópicas."},
      {id:6, pergunta:"Escolas municipais de tempo integral em Campinas."},
      {id:7, pergunta:"É importante que se discuta identidade de gênero nas escolas municipais. Identidade de gênero se refere ao gênero em que a pessoa se identifica (Exemplo: se ela se identifica como sendo um homem, uma mulher ou se ela vê a si como fora do convencional) [Melhorar]."},
      {id:8, pergunta:"Cargos de fiscalização do serviço público (Corregedor) não deveriam ser nomeados pelo prefeito. Esses cargos deveriam ser preenchidos por servidores que prestaram concurso público. "},
      {id:9, pergunta:"Intervenção policial em protestos e manifestações populares. "},
      {id:10, pergunta:"Redução da maioridade penal para 16 anos."},
      {id:11, pergunta:"Os serviços públicos de atendimento a mulheres vítimas de violência são eficientes."},
      {id:12, pergunta:"Guarda Municipal com poderes de Polícia Militar."},
      {id:13, pergunta:"Cercamento do estacionamento do Taquaral"},
      {id:14, pergunta:"Os espaços públicos de lazer são suficientes em Campinas"},
      {id:15, pergunta:"Lei do pancadão: Restringe ruídos causados por aparelhos de som instalados em veículos estacionados em vias públicas."},
      {id:16, pergunta:"Fechamento da Avenida Francisco Glicério para lazer aos fins de semana."},
      {id:17, pergunta:"Exigir alvará dos blocos de rua no carnaval de Campinas?"},
      {id:18, pergunta:"Retirada de orçamentos empenhados para a cultura com a justificativa de economia de gastos (Exemplos: FICC, Virada Cultural, Carnaval, pagamento atrasado de artistas…)"},
      {id:19, pergunta:"Gestão de equipamentos públicos culturais por grupos reconhecidos de cultura da cidade."},
      {id:20, pergunta:"Existe um incentivo da atual administração para valorização dos grupos de cultura da cidade. "},
      {id:21, pergunta:"Definição exclusiva de família como homem, mulher e filhos"},
      {id:22, pergunta:"Privatização do serviços públicos como educação, saúde, cultura etc. (Para empresas privadas ou OSs - Organizações da Sociedade Civil sem fins lucrativos)"},
      {id:23, pergunta:"Campanhas eleitorais financiadas unicamente com dinheiro público."},
      {id:24, pergunta:"Fim de coligações em eleições para vereadores. A forma atual permite que as pessoas votem em um candidato e elejam outro por causa do Coeficiente eleitoral."},
      {id:25, pergunta:"Ocupação de prédios públicos como instrumento de mobilização."},
      {id:26, pergunta:"O centro de Campinas deveria ser aberto apenas para a circulação de transporte coletivo e pedestres."},
      {id:27, pergunta:"O serviço prestado pelas empresas de ônibus concessionadas em Campinas é adequado. "},
      {id:28, pergunta:"Empresas de ônibus que não cumprirem partes importantes do contrato do transporte público devem perder a concessão."},
      {id:29, pergunta:"Regularização do Uber.  Uber é um serviço de transporte similar a um táxi conhecido popularmente como carona remunerada"},
      {id:30, pergunta:"Política de implantação de ciclovias no atual governo."},
      {id:31, pergunta:"A coleta e o tratamento do lixo em Campinas são eficientes"},
      {id:32, pergunta:"Grandes empreendimentos podem iniciar suas obras mesmo antes de conseguirem o licenciamento ambiental."},
      {id:33, pergunta:"Construção da Avenida Mackenzie [feita em cima de uma área de manancial]"},
      {id:34, pergunta:"Moradores da APA(Área de proteção ambiental) que preservam o meio ambiente deveriam receber incentivo financeiro."},
      {id:35, pergunta:"A atas, pautas e documentos da Câmara Municipal deveriam estar em uma formato padrão aberto e acessível. (Exemplo: Qualquer computador deveria poder abrir os arquivos independente do sistema)"},
      {id:36, pergunta:"Agenda digital pública obrigatória dos compromissos do Prefeito e Vereadores."},
      {id:37, pergunta:"Remoção de 16.000 famílias em moradias irregulares na região do Campo Belo para promover a expansão do aeroporto de Viracopos."},
      {id:38, pergunta:"Moradias populares na região central de Campinas em prédios e terrenos ociosos."},
      {id:39, pergunta:"Empreendimentos como do jardim Bassoli, residencial Sirius, residencial Cosmos são a melhor forma para resolver o problema de moradia da cidade de Campinas."},
      {id:40, pergunta:"A Prefeitura construiu equipamentos públicos [Escola, Centros de Saúde, Creches, Praças, Academias...] suficientes para as regiões periféricas"},
      {id:41, pergunta:"O espaço criado pela Prefeitura para a participação popular na elaboração do Plano Diretor e da Lei de Uso e Ocupação do Solo foi suficiente})"}
    ]),
    //seeds de prioridades
    knex('prioridades').insert([
      {id:1, prioridade:"Assistência social"},
      {id:2, prioridade:"Saúde"},
      {id:3, prioridade:"Segurança"},
      {id:4, prioridade:"Educação"},
      {id:5, prioridade:"Cultura"},
      {id:6, prioridade:"Mobilidade urbana"},
      {id:7, prioridade:"Meio ambiente"},
      {id:8, prioridade:"Habitação"}
    ]);
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('perguntas'),
    knex.schema.dropTable('prioridades'),
  ]);
};

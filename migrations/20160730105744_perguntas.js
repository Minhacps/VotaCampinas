exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('perguntas', function (table) {
      table.increments('id').primary();
      table.text('pergunta');
      table.timestamps();
    }),
    knex.schema.createTable('prioridades', function (table){
      table.increments('id').primary();
      table.string('prioridade');
      table.timestamps();
    }),

    //seeds de perguntas
    knex('perguntas').insert([
      {id:1, pergunta:"Descriminalização do consumo da maconha."},
      {id:2, pergunta:"É importante que se discuta identidade de gênero nas escolas municipais. [Identidade de gênero é como a pessoa se reconhece: mulher, homem ou nenhum. Para algumas pessoas essa identidade corresponde ao sexo biológico: são cisgêneros. Para outras, não: são transgêneros.]"},
      {id:3, pergunta:"Redução da maioridade penal para 16 anos."},
      {id:4, pergunta:"Fechamento do trânsito de carros na Avenida Francisco Glicério para lazer aos fins de semana."},
      {id:5, pergunta:"Redução do orçamento destinado a cultura para economia de gastos.[Exemplos: Fundo de Investimentos Culturais de Campinas, Virada Cultural, Carnaval, pagamento atrasado de artistas,...]"},
      {id:6, pergunta:"Definição exclusiva de família como homem, mulher e filhos."},
      {id:7, pergunta:"Privatização de serviços públicos como educação, saúde e cultura."},
      {id:8, pergunta:"Campanhas eleitorais financiadas unicamente com dinheiro público. [Além do dinheiro público, hoje as campanhas são financiadas por doações de pessoas físicas.]"},
      {id:9, pergunta:"Ocupação de prédios públicos como instrumento de mobilização."},
      {id:10, pergunta:"O centro de Campinas deveria ser aberto apenas para a circulação de transporte coletivo, bicicletas e pedestres."},
      {id:11, pergunta:"Regularização do Uber. [Uber é um serviço privado de transporte individual - parecido com táxi - controlado por um aplicativo de celular.]"},
      {id:12, pergunta:"Prolongamento da Avenida Mackenzie em APA - Área de Proteção Ambiental. [A Avenida Mackenzie liga o Shopping Iguatemi ao distrito de Sousas. APA é um tipo de Unidade de Conservação, uma política pública de proteção do meio ambiente.]"},
      {id:13, pergunta:"Modelo atual das escolas municipais de tempo integral em Campinas."},
      {id:14, pergunta:"A atual gestão municipal combateu de maneira eficiente o mosquito da dengue."},
      {id:15, pergunta:"Moradores da APA - Área de Proteção Ambiental - que preservam o meio ambiente deveriam receber incentivo financeiro."},
      {id:16, pergunta:"Agenda pública obrigatória dos compromissos de Prefeito(a) e Vereadores(as)."},
      {id:17, pergunta:"Remoção de moradias irregulares para expansão econômica."},
      {id:18, pergunta:"Moradias populares na região central de Campinas em prédios e terrenos ociosos."},
      {id:19, pergunta:"Construção de moradias populares na periferia mesmo antes de garantir atendimento básico como centros de saúde e escolas."},
      {id:20, pergunta:"Fim das coligações eleitorais em eleições para vereadores. [A forma atual permite que as pessoas votem em candidatos(as) do partido X e elejam candidatos(as) do partido Y, que pensam diferente.]"},
      {id:21, pergunta:"Programa Mais Médicos. [Programa do governo federal que traz médicos de outros países para trabalhar no Brasil.]"},
      {id:22, pergunta:"Naves-mães. [Ampliação da oferta de vagas de creches em parceria com organizações não governamentais.]"},
      {id:23, pergunta:"Cargos de fiscalização do serviço público (Corregedorias) não deveriam ser nomeados pelo prefeito, e sim por servidores que prestaram concurso público."},
      {id:24, pergunta:"Intervenção policial em protestos e manifestações populares."},
      {id:25, pergunta:"Os serviços públicos de atendimento a mulheres vítimas de violência são eficientes em Campinas."},
      {id:26, pergunta:"Guarda Municipal com poderes de Polícia Militar."},
      {id:27, pergunta:"Cercamento do estacionamento do Taquaral"},
      {id:28, pergunta:"Os espaços públicos de lazer são suficientes em Campinas"},
      {id:29, pergunta:"Lei do pancadão. [Proíbe ruídos excessivos causados por aparelhos de som instalados em veículos estacionados em vias públicas.]"},
      {id:30, pergunta:"Exigir alvará dos blocos de rua no carnaval de Campinas."},
      {id:31, pergunta:"Terceirização da gestão de espaços culturais da cidade para coletivos de cultura historicamente reconhecidos em Campinas."},
      {id:32, pergunta:"Existe um incentivo da atual administração para valorização dos grupos de cultura da cidade."},
      {id:33, pergunta:"O serviço prestado pelas empresas de ônibus concessionadas em Campinas é satisfatório."},
      {id:34, pergunta:"Empresas de ônibus que não cumprirem partes importantes do contrato do transporte público devem perder a concessão."},
      {id:35, pergunta:"A política municipal de implantação de ciclovias é satisfatória."},
      {id:36, pergunta:"A coleta e o tratamento do lixo em Campinas são eficientes."},
      {id:37, pergunta:"Grandes empreendimentos podem iniciar suas obras mesmo antes de conseguirem o licenciamento ambiental."},
      {id:38, pergunta:"A atas, pautas e documentos da Câmara Municipal deveriam estar em uma formato padrão aberto e acessível. (Exemplo: Qualquer computador deveria poder abrir os arquivos independente do sistema)"},
      {id:39, pergunta:"A Prefeitura construiu equipamentos públicos [Escola, Centros de Saúde, Creches, Praças, Academias...] suficientes para as regiões periféricas"},
      {id:40, pergunta:"Os canais criados pela Prefeitura para a participação popular na elaboração do Plano Diretor e da Lei de Uso e Ocupação do Solo são eficazes."},
      {id:41, pergunta:"O tratamento de água e esgoto em Campinas são eficientes."}

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
      {id:8, prioridade:"Habitação"},
      {id:9, prioridade:"Transparência na gestão pública"}
    ])
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('perguntas'),
    knex.schema.dropTable('prioridades'),
  ]);
};

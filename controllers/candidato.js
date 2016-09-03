var Vereador = require('../models/Vereador');
var RespostaPergunta = require('../models/RespostaPergunta');

exports.obterCandidato = function (req, res) {
  new Vereador({userId: req.params.userId})
    .query((qb) => {
      qb
        .join('users', 'vereadores.userId', 'users.id')
        .join('partidos', 'vereadores.partidoId', 'partidos.id');
    })
    .fetch({
      columns: [
        'users.name as nome',
        'users.picture as foto',
        'vereadores.*',
        'partidos.nome as partidoNome',
        'partidos.sigla as partidoSigla'
      ]
    })
    .then((candidato) => {
      res.send(candidato);
    });
};

exports.obterRespostas = function (req, res) {
  new RespostaPergunta()
    .where('userId', '=', req.params.userId)
    .fetchAll()
    .then((respostas) => {
      res.send(respostas);
    });
};

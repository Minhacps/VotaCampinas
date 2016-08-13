var RespostaPergunta = require('../models/RespostaPergunta');

exports.inserirReposta = function (req, res) {

  new RespostaPergunta({
    userId: req.body.usuarioId,
    perguntaId: req.body.pergunta.id
  }).fetch().then((resposta) => {
    if (resposta) {
      RespostaPergunta.forge({
        id: resposta.id
      })
        .save({resposta: req.body.pergunta.resposta}, {patch: true})
        .then((reposta) => {
          res.send(200);
        });
      return;
    }
    RespostaPergunta.forge({
      userId: req.body.usuarioId,
      perguntaId: req.body.pergunta.id,
      resposta: req.body.pergunta.resposta,
      justificativa: req.body.pergunta.justificativa
    })
      .save()
      .then((reposta) => {
        res.send(200);
      });
  });
};

exports.obterRespostas = function (req, res) {
  RespostaPergunta.forge()
    .where('userId', '=', req.user.id)
    .fetchAll()
    .then(function (respostas) {
      res.send(respostas);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

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
      resposta: req.body.pergunta.resposta
    })
      .save()
      .then((reposta) => {
        res.send(200);
      });
  });
};

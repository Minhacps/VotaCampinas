var RespostaPergunta = require('../models/RespostaPergunta');

exports.inserirReposta = function (req, res) {
  console.log(req.body);

  RespostaPergunta.forge({
    userId: req.body.usuarioId,
    perguntaId: req.body.pergunta.id,
    resposta: req.body.pergunta.resposta
  })
    .save()
    .then((reposta) => {
      res.send(200);
    });
};

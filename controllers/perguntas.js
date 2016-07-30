var Perguntas = require('../models/Pergunta');

exports.obterPerguntas = function (req, res) {
  new Perguntas()
    .fetchAll()
    .then((perguntas) => {
      res.send(perguntas);
    });
};

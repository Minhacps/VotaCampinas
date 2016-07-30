var Prioridade = require('../models/Prioridade');

exports.obterTodas = function(req, res){

  new Prioridade().fetchAll()
    .then(function(prioridades) {
        res.send(prioridades);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
};

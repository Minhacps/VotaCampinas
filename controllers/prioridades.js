var Prioridade = require('../models/Prioridade');

exports.obterTodas = function(req, res){

  new Prioridade().fetchAll({
    columns: ['id', 'prioridade']
  })
    .then(function(prioridades) {
        res.send(prioridades);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
};

var Prioridade = require('../models/Prioridade');
var RespostaPrioridade = require('../models/RespostaPrioridade');

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

exports.inserirRespostas = function(req, res){
  // //isso e um """""""""""""""""""""mock"""""""""""""""""""""
  // req.user = {
  //   id: 1
  // };
  // req.body = [
  //   {id: 1},
  //   {id: 2},
  //   {id: 3},
  //   {id: 4}
  // ];
  // //isso e um """""""""""""""""""""mock"""""""""""""""""""""
  var respostas = req.body
      .slice(0,3)
      .map((prioridade) => {
        return {
          prioridadeId: Number(prioridade.id),
          userId: req.user.id
        }
      });

  if(req.body.length < 3)
    return res.status(500).json({err: "voce precisa responder as 3 questoes."});

  RespostaPrioridade.forge()
    .where('userId', req.user.id)
    .fetchAll()
    .then((results) => {
      if(results.length > 0)
        return res.status(500).send({err:"voce ja adicionou suas respostas"});
      RespostaPrioridade.collection(respostas).invokeThen('save')
        .then((item) => {
          return res.json(item);
        }, (err) => {
          return res.status(500).send(err);
        })
    });
};

exports.obterRespostas = function (req, res) {
  RespostaPrioridade.forge()
    .where('userId', req.user.id)
    .fetch()
    .then(function (prioridades) {
      res.send(prioridades);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

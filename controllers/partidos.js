'use strict';

const Partidos = require('../models/Partido');

exports.obterPartidos = function (req, res) {
  new Partidos()
    .fetchAll()
    .then((partidos) => {
      res.send(partidos.toJSON());
    });
};

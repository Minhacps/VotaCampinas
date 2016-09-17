'use strict';

const async = require('async');
const RespostaPrioridade = require('../models/RespostaPrioridade');
const RespostaPergunta = require('../models/RespostaPergunta');

exports.obterMatches = (req, res) => {
  const prioridadeUsuario = (callback) => {
    new RespostaPrioridade()
      .where('userId', '=', req.user.id)
      .orderBy('id')
      .fetchAll()
      .then((prioridadesUsuario) => {
        prioridadesUsuario = prioridadesUsuario.toJSON().map((usuario) => usuario.prioridadeId);
        callback(null, prioridadesUsuario);
      });
  };

  const prioridadesVereadores = (callback) => {
    new RespostaPrioridade()
    .query((qb) => {
      qb
        .join('users', 'respostasPrioridades.userId', 'users.id')
        .join('vereadores', 'users.id', 'vereadores.userId')
        .join('partidos', 'vereadores.partidoId', 'partidos.id')
        .where('ehVereador', '=', 1);
    })
    .orderBy('respostasPrioridades.userId')
    .orderBy('respostasPrioridades.id')
    .fetchAll({
      columns: [
        'users.name as nome',
        'users.picture as picture',
        'respostasPrioridades.userId',
        'respostasPrioridades.prioridadeId',
        'vereadores.partidoId',
        'vereadores.numero',
        'partidos.nome as partidoNome',
        'partidos.sigla as partidoSigla'
      ]
    })
    .then((prioridadesVereadores) => {
      console.log(prioridadesVereadores.toJSON())
      callback(null, prioridadesVereadores.toJSON());
    });
  };

  const respostasUsuario = (callback) => {
    new RespostaPergunta()
      .where('userId', '=', req.user.id)
      .orderBy('id')
      .fetchAll()
      .then((perguntasUsuario) => {
        perguntasUsuario = perguntasUsuario.toJSON();
        callback(null, perguntasUsuario);
      });
  };

  const respostasVereadores = (callback) => {
    new RespostaPergunta()
      .query((qb) => {
        qb
          .join('users', 'respostasPerguntas.userId', 'users.id')
          .where('ehVereador', '=', 1);
      })
      .orderBy('userId')
      .fetchAll({
        columns: ['respostasPerguntas.userId','respostasPerguntas.perguntaId', 'respostasPerguntas.resposta']
      })
      .then((perguntasVereador) => {
        perguntasVereador = perguntasVereador.toJSON();
        callback(null, perguntasVereador);
      });
  };

  const reduzirVereadores = (prioridadesVereadores, respostasVereadores) => {
    return prioridadesVereadores.reduce((red, prioridadeVereador) => {
      let prioridadeVereadorUltimo = red[red.length - 1];
      if (
        prioridadeVereadorUltimo &&
        prioridadeVereadorUltimo.id === prioridadeVereador.userId
      ) {
        prioridadeVereadorUltimo.prioridades.push(prioridadeVereador.prioridadeId);
      } else {
        red.push({
          id: prioridadeVereador.userId,
          nome: prioridadeVereador.nome,
          foto: prioridadeVereador.picture,
          partido: {
            nome: prioridadeVereador.partidoNome,
            sigla: prioridadeVereador.partidoSigla,
          },
          numero: prioridadeVereador.numero,
          prioridades: [prioridadeVereador.prioridadeId],
          respostas: respostasVereadores
            .filter((resposta) => resposta.userId === prioridadeVereador.userId)
            .map((resposta) => {
              delete resposta.userId;
              return resposta;
            }),
          pontuacao: 0
        });
      }
      return red;
    }, []);
  };

  const pontuarVereadores = (vereadores, prioridadesUsuario, respostasUsuario) => {
    vereadores.forEach((vereador, indexVereadores) => {

      vereador.prioridades.forEach((prioridadeVereador, indexPrioridades) => {
        if(prioridadesUsuario.indexOf(prioridadeVereador) !== -1)
          vereadores[indexVereadores].pontuacao += 1;
        if(prioridadesUsuario[indexPrioridades] === prioridadeVereador)
          vereadores[indexVereadores].pontuacao += 1;
      });

      respostasUsuario.forEach((respostaUsuario, index) => {
        vereador.respostas
          .filter( (respostaVereador) => respostaVereador.perguntaId === respostaUsuario.perguntaId )
          .forEach( (respostaVereador) => {
            if(respostaUsuario.resposta === respostaVereador.resposta)
              vereadores[indexVereadores].pontuacao += 2;
            else if( respostaVereador.resposta % 2 == respostaUsuario.resposta % 2 )
              vereadores[indexVereadores].pontuacao += 1;
          });
      });

    });
    return vereadores;
  }

  async.parallel([
    prioridadeUsuario,
    prioridadesVereadores,
    respostasUsuario,
    respostasVereadores
  ], (err, results) => {
    console.error(err);

    res.send(
      pontuarVereadores(reduzirVereadores(results[1], results[3]), results[0], results[2])
    );
  });
};

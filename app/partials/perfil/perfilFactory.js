(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perfilFactory = function ($rootScope, $http) {
    return {
      obterPerguntas: obterPerguntas,
      salvarResposta: salvarResposta,
      obterRespostas: obterRespostas
    };

    function obterPerguntas () {
      return $http.get('/api/perguntas');
    }

    function salvarResposta (pergunta) {
      delete pergunta.pergunta;

      var obj = {
        usuarioId: $rootScope.currentUser.id,
        pergunta: pergunta
      };

      return $http.post('/api/respostas', obj);
    }

    function obterRespostas () {
      return $http.get('/api/respostas/');
    }
  };

  app.factory('perfilFactory', perfilFactory);
})();

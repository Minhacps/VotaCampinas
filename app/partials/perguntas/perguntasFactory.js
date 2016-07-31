(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasFactory = function ($rootScope, $http) {
    return {
      obterPerguntas: obterPerguntas,
      salvarResposta: salvarResposta
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
  };

  app.factory('perguntasFactory', perguntasFactory);
})();

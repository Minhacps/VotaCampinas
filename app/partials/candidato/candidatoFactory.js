(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var candidatoFactory = function ($rootScope, $http) {
    return {
      obterCandidato: obterCandidato,
      obterRespostas: obterRespostas
    };

    function obterCandidato (candidatoId) {
      return $http.get('/api/candidato/' + candidatoId);
    }

    function obterRespostas (candidatoId) {
      return $http.get('/api/candidato/' + candidatoId + '/respostas');
    }
  };

  app.factory('candidatoFactory', candidatoFactory);
})();

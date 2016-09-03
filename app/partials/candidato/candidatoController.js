(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var candidatoController = function ($scope, $routeParams, candidatoFactory, perguntasFactory) {
    var candidatoId = $routeParams.id;

    $scope.possiveisRespostas = {
      1: 'Discordo',
      2: 'Concordo plenamente',
      3: 'Discordo plenamente',
      4: 'Concordo'
    };

    candidatoFactory.obterCandidato(candidatoId).then(function (candidato) { $scope.candidato = candidato.data; });
    candidatoFactory.obterRespostas(candidatoId).then(function (respostas) { $scope.candidato.respostas = respostas.data; });

    perguntasFactory.obterPerguntas().then(function (perguntas) { $scope.perguntas = perguntas.data; });
    perguntasFactory.obterRespostas().then(function (respostas) { $scope.respostasEleitor = respostas.data; });
  };

  app.controller('candidatoController', candidatoController);
}());

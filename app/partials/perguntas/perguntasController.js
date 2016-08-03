(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasController = function ($scope, $timeout, perguntasFactory) {
    $scope.pagina = 0;

    perguntasFactory.obterRespostas()
    .success(function (respostas) {
      $scope.respostas = respostas;
      $scope.pagina = respostas.length;
    });

    perguntasFactory.obterPerguntas()
      .success(function (perguntas) {
        $scope.perguntas = perguntas.slice(0, 3);
        $scope.perguntas.map(function (pergunta, indice) {
          if ($scope.respostas[indice]) {
            $scope.perguntas[indice].resposta = $scope.respostas[indice].resposta;
          }
        });
      });

    $scope.selecionadas = {};

    $scope.next = function () {
      $scope.enviando = true;

      $timeout(function () {
        var pergunta = angular.copy($scope.perguntas[$scope.pagina]);
        perguntasFactory.salvarResposta(pergunta)
        .success(function () {
          ++$scope.pagina;
          $scope.enviando = false;
        });
      }, 700);
    };

    $scope.back = function () {
      --$scope.pagina;
    };
  };

  app.controller('perguntasController', perguntasController);
}());

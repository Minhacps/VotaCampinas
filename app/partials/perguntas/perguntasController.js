(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasController = function ($rootScope, $scope, $timeout, $q, perguntasFactory) {
    $scope.pagina = 0;
    $scope.selecionadas = {};

    $q.all([
      perguntasFactory.obterRespostas(),
      perguntasFactory.obterPerguntas()
    ])
    .then(function (res) {
      $scope.respostas = res[0].data;
      $scope.pagina = res[0].data.length;
      $scope.perguntas = res[1].data;
      $scope.perguntas.map(function (pergunta, indice) {
        if ($scope.respostas[indice]) {
          $scope.perguntas[indice].resposta = $scope.respostas[indice].resposta;
        }
      });
    });

    $scope.next = function () {
      if ($rootScope.currentUser.ehVereador) {
        return false;
      }
      salvarResposta();
    };

    $scope.pular = function () {
      if ($scope.pagina < 18) {
        return false;
      }
      salvarResposta();
    };

    $scope.nextVereador = function () {
      salvarResposta();
    };

    function salvarResposta () {
      $scope.enviando = true;

      $timeout(function () {
        var pergunta = angular.copy($scope.perguntas[$scope.pagina]);
        perguntasFactory.salvarResposta(pergunta)
        .success(function () {
          ++$scope.pagina;
          $scope.enviando = false;
        });
      }, 700);
    }

    $scope.back = function () {
      --$scope.pagina;
    };
  };

  app.controller('perguntasController', perguntasController);
}());

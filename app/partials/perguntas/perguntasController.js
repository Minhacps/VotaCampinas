(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasController = function ($rootScope, $scope, $timeout, $q, perguntasFactory) {
    $rootScope.pagina = 0;
    $scope.selecionadas = {};

    $q.all([
      perguntasFactory.obterRespostas(),
      perguntasFactory.obterPerguntas()
    ])
    .then(function (res) {
      $scope.respostas = res[0].data;
      $rootScope.pagina = res[0].data.length;
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
      if ($rootScope.pagina < 18) {
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
        var pergunta = angular.copy($scope.perguntas[$rootScope.pagina]);
        perguntasFactory.salvarResposta(pergunta)
        .success(function () {
          ++$rootScope.pagina;
          $scope.enviando = false;
        });
      }, 700);
    }

    $scope.back = function () {
      --$rootScope.pagina;
    };
  };

  app.controller('perguntasController', perguntasController);
}());

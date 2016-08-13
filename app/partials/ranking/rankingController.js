(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var rankingController = function ($scope) {
    $scope.candidatos = [
      {
        id: 2,
        nome: "Victor Vereador",
        partido: "123",
        numero: 123,
        prioridades: [
          1,
          5,
          4
        ],
        pontuacao: 90
      },
      {
        id: 3,
        nome: "Imelda Swanson",
        partido: "Quia",
        numero: 64,
        prioridades: [
          3,
          6,
          1
        ],
        pontuacao: 45
      }
    ];
  };

  app.controller('rankingController', rankingController);

}());
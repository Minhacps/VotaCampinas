(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var perfilController = function($scope, perfilFactory) {
    $scope.possiveisRespostas = {
      1: 'Discordo',
      2: 'Concordo plenamente',
      3: 'Discordo plenamente',
      4: 'Concordo'
    };

    perfilFactory.obterPerguntas().then(function(res) { $scope.perguntas = res.data; });
    perfilFactory.obterRespostas().then(function(res) { $scope.respostas = res.data; });
  };

  app.controller('perfilController', perfilController);

}());

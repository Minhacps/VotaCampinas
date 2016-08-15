(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var rankingController = function ($scope, Ranking) {
    Ranking.obterMatches()
    .then(function (res) {
      $scope.candidatos = res;
    });
  };

  app.controller('rankingController', rankingController);

}());
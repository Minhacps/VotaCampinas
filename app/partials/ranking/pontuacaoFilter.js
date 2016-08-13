(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var pontuacaoFilter = function () {
    return function(pontuacao) {
      var pontuacaoMaxima = 90;

      return pontuacao * 100 / pontuacaoMaxima;
    }
  };

  app.filter('pontuacaoFilter', pontuacaoFilter);

}());
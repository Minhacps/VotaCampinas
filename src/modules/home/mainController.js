(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var mainController = function($scope) {
    $scope.projeto = 'Vota Campinas';
    
  }

  app.controller('mainController', mainController);

}());
(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var loginController = function($scope) {
    $scope.pagina = 'Login';
    
  }

  app.controller('loginController', loginController);

}());
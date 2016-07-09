(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/header.html',
        controller: 'mainController'
      });
      // .otherwise({redirectTo: '/'});
  });

})();
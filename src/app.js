(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/login/login.html',
        controller: 'loginController'
      });
      // .otherwise({redirectTo: '/'});
  });

})();
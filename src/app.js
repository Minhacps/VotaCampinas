(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/login/login.html',
        controller: 'loginController'
      })
      .when('/ranking', {
        templateUrl: 'modules/ranking/ranking.html',
        controller: 'rankingController'
      })
      ;
      // .otherwise({redirectTo: '/'});
  });

})();
(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/login/login.html',
        controller: 'loginController'
      })
      .when('/cadastro', {
        templateUrl: 'modules/cadastro/cadastro.html',
        controller: 'cadastroController'
      })
      .when('/prioridades', {
        templateUrl: 'modules/prioridades/prioridades.html',
        controller: 'prioridadesController'
      })
      ;
      // .otherwise({redirectTo: '/'});

  });

})();
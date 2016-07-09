(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider, $locationProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/login/login.html',
        controller: 'loginController'
      })
      .when('/ranking', {
        templateUrl: 'modules/ranking/ranking.html',
        controller: 'rankingController'
      })
      .when('/cadastro', {
        templateUrl: 'modules/cadastro/cadastro.html',
        controller: 'cadastroController'
      })
      .when('/perfil', {
        templateUrl: 'modules/perfil/perfil.html',
        controller: 'perfilController'
      })
      // .otherwise({redirectTo: '/'});
  });

})();

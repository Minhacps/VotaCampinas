(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(function($routeProvider, $locationProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'modules/login/login.html',
        controller: 'loginController'
      })
      .when('/login', {
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
      .when('/prioridades', {
        templateUrl: 'modules/prioridades/prioridades.html',
        controller: 'prioridadesController'
      })
      .when('/perfil', {
        templateUrl: 'modules/perfil/perfil.html',
        controller: 'perfilController'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
      });

  });

})();

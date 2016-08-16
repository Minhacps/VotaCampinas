(function () {
  'use strict';
  var app = angular.module('votaCampinas');
  var cadastroController = function ($scope, $rootScope, $location, $window, $auth, Partidos) {
    $scope.user = {};
    $scope.required = true;

    Partidos.obterTodos()
    .then(function (res) {
      $scope.partidos = res;
      $('select').material_select();
    });

    $scope.enviar = function () {
      $scope.user.gender = $('#sexo').val();

      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/prioridades');
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };

    $('select').material_select();
    $('#data-nascimento').mask('00/00/0000');
  };

  app.controller('cadastroController', cadastroController);
}());

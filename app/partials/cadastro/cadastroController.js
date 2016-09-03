(function () {
  'use strict';
  var app = angular.module('votaCampinas');
  var cadastroController = function ($scope, $rootScope, $location, $window, $auth, Partidos) {
    $scope.user = {};
    $scope.required = true;

    $scope.$watchCollection('user.ehVereador', function (ehVereador) {
      if (ehVereador && !$scope.partidos) {
        Partidos.obterTodos()
        .then(function (res) {
          $scope.partidos = res;
          $('select').material_select();
        })
        .catch(function (err) {
          console.error(err);
        });
      }
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
          window.scrollTo(0, 0);
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

    $('#cnpj').mask('00.000.000/0000-00');
  };

  app.controller('cadastroController', cadastroController);
}());

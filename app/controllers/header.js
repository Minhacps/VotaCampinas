angular.module('votaCampinas')
  .controller('HeaderCtrl', function($scope, $location, $window, $auth) {
    $(".button-collapse").sideNav();

    $scope.closeNav = function() {
      $(".button-collapse").sideNav('hide');
    };
    
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
      $scope.closeNav();
    };
  });

angular.module('votaCampinas')
  .controller('ResetCtrl', function($scope, $location, Account) {
    
    let token = $location.$$path.split('reset/')[1];

    $scope.resetPassword = function() {
      Account.resetPassword($scope.user, token)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  });

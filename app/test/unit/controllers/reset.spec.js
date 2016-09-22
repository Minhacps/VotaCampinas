describe('Controller - Reset Password', function() {
  var $scope = Account = $q = $location = null;

  beforeEach(function() {
    angular.mock.module('votaCampinas');

    inject(function($controller, $rootScope, _$q_, _Account_, _$location_) {
      $scope = $rootScope.$new();
      Account = _Account_;
      $q = _$q_;
      $location = _$location_;

      $controller('ResetCtrl', {
        $scope: $scope
      });
    });
  });

  describe('Given a sucessful password reset', function() {

    it('Should set the success message', function() {
      var responseData = {
        data: 'Success'
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.resolve(responseData));

      $scope.resetPassword();

      $scope.$digest();

      expect($scope.messages.success).toEqual(['Success']);
    });

    it('Should redirect to login page', function() {
      var responseData = {
        data: 'Success'
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.resolve(responseData));
      spyOn($location, 'path');

      $scope.resetPassword();

      $scope.$digest();

      expect($location.path).toHaveBeenCalledWith('/login');
    });

  });

  describe('Given an unsuccessful password reset', function() {

    it('Should set the error message when the API returns a non-array value', function() {
      var responseData = {
        data: 'Erro'
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.reject(responseData));

      $scope.resetPassword();

      $scope.$digest();

      expect($scope.messages.error).toEqual(['Erro']);
    });

    it('Should set the error message when the API returns an array value', function() {
      var responseData = {
        data: ['Erro 1', 'Erro 2']
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.reject(responseData));

      $scope.resetPassword();

      $scope.$digest();

      expect($scope.messages.error).toEqual(['Erro 1', 'Erro 2']);
    });

  });

});

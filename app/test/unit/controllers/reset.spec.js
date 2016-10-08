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

  describe('Dada uma redefinição de senha com sucesso', function() {

    it('Deve definir a mensagem de sucesso', function() {
      var responseData = {
        data: 'Success'
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.resolve(responseData));

      $scope.resetPassword();

      $scope.$digest();

      expect($scope.messages.success).toEqual(['Success']);
    });

    it('Deve redirecionar para a página de autenticação', function() {
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

  describe('Dada uma redefinição de senha malsucedida', function() {

    it('Deve definir a mensagem de erro quando a API retornar um erro que não seja um array', function() {
      var responseData = {
        data: 'Erro'
      };

      spyOn(Account, 'resetPassword')
        .and.returnValue($q.reject(responseData));

      $scope.resetPassword();

      $scope.$digest();

      expect($scope.messages.error).toEqual(['Erro']);
    });

    it('Deve definir a mensagem de erro quando a API retornar um erro que seja um array', function() {
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

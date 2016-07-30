(function() {
  'use strict';

  var app = angular.module('votaCampinas', ['ngRoute']);

  app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

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

  }]);

})();

angular.module('votaCampinas')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
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
    };
  }]);

angular.module('votaCampinas')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
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
    };
  }]);

angular.module('votaCampinas')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
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
    };
  }]);

angular.module('votaCampinas')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
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
  }]);
angular.module('votaCampinas')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", function($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
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
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
  }]);
angular.module('votaCampinas')
  .controller('ResetCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.resetPassword = function() {
      Account.resetPassword($scope.user)
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
  }]);

angular.module('votaCampinas')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function ($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function () {
      console.log($scope.user)
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
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
  }]);

angular.module('votaCampinas')
  .factory('Account', ["$http", function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        return $http.post('/reset', data);
      }
    };
  }]);
angular.module('votaCampinas')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);
(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var cadastroController = function($scope) {    
  	$('select').material_select();
  	$('.exclusivo-candidato').hide();
  	$('#sou-candidato').change(function (){
  		$('.exclusivo-candidato').toggle("slow");
  	});
  }
  cadastroController.$inject = ["$scope"];

  app.controller('cadastroController', cadastroController);

}());

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var loginController = function ($scope) {
  };
  loginController.$inject = ["$scope"];

  app.controller('loginController', loginController);

}());
(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var perfilController = function($scope) {    
  }
  perfilController.$inject = ["$scope"];

  app.controller('perfilController', perfilController);

}());

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var prioridadesController = function($scope) {    
  }
  prioridadesController.$inject = ["$scope"];

  app.controller('prioridadesController', prioridadesController);

}());
(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var rankingController = function ($scope) {
  };
  rankingController.$inject = ["$scope"];

  app.controller('rankingController', rankingController);

}());
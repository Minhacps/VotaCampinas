angular.module('votaCampinas', ['ngRoute', 'satellizer'])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/login/login.html',
        controller: 'loginController'
      })
      // .when('/login', {
      //   templateUrl: 'partials/login/login.html',
      //   controller: 'loginController'
      // })
      .when('/ranking', {
        templateUrl: 'partials/ranking/ranking.html',
        controller: 'rankingController'
      })
      .when('/cadastro', {
        templateUrl: 'partials/cadastro/cadastro.html',
        controller: 'cadastroController'
      })
      .when('/prioridades', {
        templateUrl: 'partials/prioridades/prioridades.html',
        controller: 'prioridadesController'
      })
      .when('/perfil', {
        templateUrl: 'partials/perfil/perfil.html',
        controller: 'perfilController'
      })
      
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/projeto', {
        templateUrl: 'partials/projeto/projeto.html',
        //controller: 'ProjetoCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/como-funciona', {
        templateUrl: 'partials/comofunciona/como-funciona.html',
        //controller: 'ComoFuncionaCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });

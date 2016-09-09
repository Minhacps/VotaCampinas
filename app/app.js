angular.module('votaCampinas', ['ngRoute', 'satellizer'])
  .config(function ($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home/home.html'
      })
      .when('/home', {
        templateUrl: 'partials/home/home.html'
      })
      .when('/projeto', {
        templateUrl: 'partials/projeto/projeto.html'
      })
      .when('/como-funciona', {
        templateUrl: 'partials/comofunciona/como-funciona.html'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'loginController',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/ranking', {
        templateUrl: 'partials/ranking/ranking.html',
        controller: 'rankingController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/cadastro', {
        templateUrl: 'partials/cadastro/cadastro.html',
        controller: 'cadastroController',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/prioridades', {
        templateUrl: 'partials/prioridades/prioridades.html',
        controller: 'prioridadesController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/candidato/:id', {
        templateUrl: 'partials/candidato/candidato.html',
        controller: 'candidatoController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/perguntas', {
        templateUrl: 'partials/perguntas/perguntas.html',
        controller: 'perguntasController',
        resolve: { loginRequired: loginRequired }
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
      .when('/recuperar-senha', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
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

    function skipIfAuthenticated ($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired ($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function ($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var rankingController = function ($scope, Ranking) {
    Ranking.obterMatches()
    .then(function (res) {
      $scope.candidatos = res;
    });

    (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=245108102541730";
     fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "twitter-wjs"));
  };

  app.controller('rankingController', rankingController);

}());

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var prioridadesController = function($scope, $timeout, $http, $location) {
  	var inTransition = false;

    $scope.submitOk     = false;
  	$scope.pagina       = 1;
    $scope.respostas    = [];

    $scope.model = {
      id: "",
      prioridade: ""
    };

    $http.get('/api/prioridades')
    .success(function(suc){
      $scope.opcoes = suc;
    })
    .error(function(err){
      console.log(err);
    })

  	$scope.next = function(){
  		if(!inTransition){
        var opcoes  = $scope.opcoes,
            opcao   = $scope.model.prioridade,
            op      = {};

        var idx = opcoes.map(function(i){
          if(i.id == opcao){ op = i; }
          return Number(i.id);
        }).indexOf(Number(opcao));

        if($scope.pagina >= 3 && !$scope.submitOk) {
          $scope.submitOk = true;
        } else if($scope.submitOk) {
          $scope.respostas.pop();
        } else{
          inTransition = true;
          $timeout(function(){
            opcoes.splice(idx, 1);
            opcao = '';
            $scope.pagina += 1;
            return inTransition = false;
          }, 500);

          $('.opcoes').animate({left: '1900px'}, 400).animate({left: '-1900px'}, 0).animate({left: '0'}, 400);
        }

        $scope.respostas.push(op);
      }
  	}

  	$scope.back = function(){
      if($scope.submitOk){ $scope.respostas.pop(); $scope.submitOk = false; }
      $scope.opcoes.push($scope.respostas.pop());
  		$scope.model.prioridade = '';
		  $scope.pagina -= 1;
      $('.opcoes').animate({left: '-1900px'}, 400).animate({left: '1900px'}, 0).animate({left: '0'}, 400);
  	}

    $scope.submit = function(){
      $http.post('/api/prioridades', $scope.respostas)
      .success(function(suc){
        $location.path('/perguntas');
      })
      .error(function(err){
        console.log(err);
      })
    }

  }

  app.controller('prioridadesController', prioridadesController);

}());
